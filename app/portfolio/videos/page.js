"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Maximize, ArrowRight,
  Sparkles, Filter, Clock, Eye, Heart, Share2,
  Zap, Star, Users, Award, X, Image as ImageIcon
} from "lucide-react";
import axios from "axios";
import Link from "next/link";

// Helper function to format Google Drive thumbnail URLs
const formatThumbnailUrl = (url) => {
  if (!url) return null;
  
  // Handle Google Drive URLs
  if (url.includes('drive.google.com')) {
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    // Format 1: https://drive.google.com/file/d/FILE_ID/view
    const driveMatch = url.match(/\/d\/([^\/]+)/);
    if (driveMatch && driveMatch[1]) {
      fileId = driveMatch[1];
    }
    // Format 2: https://drive.google.com/open?id=FILE_ID
    else if (url.includes('id=')) {
      const idMatch = url.match(/id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }
    // Format 3: Direct file ID in URL
    else if (url.length === 33 && !url.includes('/')) {
      fileId = url; // Might be just the file ID
    }
    
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  
  return url;
};

// Helper function to preserve line breaks in text
const formatDescription = (text) => {
  if (!text) return '';
  // Replace newlines with <br> tags for HTML display
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

// Helper function to validate image URL
const isValidImage = (url) => {
  if (!url) return false;
  try {
    const parsedUrl = new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(parsedUrl.pathname);
  } catch {
    return false;
  }
};

const VideosPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProjects, setVideoProjects] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterScrollPosition, setFilterScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [thumbnailErrors, setThumbnailErrors] = useState({});
  const filterContainerRef = useRef(null);

  const filters = [
    { id: "all", label: "All Videos" },
    { id: "Short form Videos", label: "Short Form" },
    { id: "Gaming Videos", label: "Gaming" },
    { id: "Social Media Videos", label: "Social Media" },
    { id: "Explainer Videos", label: "Explainer" },
    { id: "Documentaries", label: "Documentaries" },
    { id: "Motion Graphics", label: "Motion Graphics" },
    { id: "Ads", label: "Ads" },
    { id: "Music Videos", label: "Music Videos" },
    { id: "VFX", label: "VFX" }
  ];

  const stats = [
    { number: "50+", label: "Video Projects", icon: Play },
    { number: "2M+", label: "Total Views", icon: Eye },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "24/7", label: "Support", icon: Users }
  ];

  // Updated filtering logic to handle multiple categories
  const filteredVideos = activeFilter === "all"
    ? videoProjects
    : videoProjects.filter(video => 
        video.categories && video.categories.includes(activeFilter)
      );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Function to detect video source and format URL accordingly
  const getVideoSource = (videoUrl) => {
    if (!videoUrl) return null;

    // YouTube URLs
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      let videoId = '';

      // Handle different YouTube URL formats
      if (videoUrl.includes('youtube.com/watch?v=')) {
        videoId = videoUrl.split('v=')[1]?.split('&')[0];
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
      } else if (videoUrl.includes('youtube.com/embed/')) {
        videoId = videoUrl.split('embed/')[1]?.split('?')[0];
      }

      if (videoId) {
        return {
          type: 'youtube',
          url: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
        };
      }
    }

    // Google Drive URLs
    if (videoUrl.includes('drive.google.com')) {
      if (videoUrl.includes('/file/d/')) {
        const fileId = videoUrl.split('/file/d/')[1]?.split('/')[0];
        if (fileId) {
          return {
            type: 'google-drive',
            url: `https://drive.google.com/file/d/${fileId}/preview`
          };
        }
      }
    }

    // Vimeo URLs
    if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        return {
          type: 'vimeo',
          url: `https://player.vimeo.com/video/${videoId}?autoplay=1`
        };
      }
    }

    // Direct video files (MP4, WebM, etc.)
    if (videoUrl.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i)) {
      return {
        type: 'direct',
        url: videoUrl
      };
    }

    // If no specific type detected, try to embed as iframe
    return {
      type: 'generic',
      url: videoUrl
    };
  };

  // Function to render video player based on source type
  const renderVideoPlayer = (video) => {
    const source = getVideoSource(video.videoUrl);

    if (!source) {
      const formattedThumbnail = formatThumbnailUrl(video.thumbnail);
      return (
        <div className="w-full h-96 bg-gray-800 rounded-2xl flex items-center justify-center">
          {formattedThumbnail ? (
            <img
              src={formattedThumbnail}
              alt={video.title}
              className="w-full h-full object-contain bg-black"
              onError={(e) => {
                e.target.src = '/default-thumbnail.jpg';
                e.target.className = "w-full h-full object-contain bg-gray-800 p-4";
              }}
            />
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-white text-lg">Video Preview</p>
              <p className="text-gray-400 text-sm mt-2">{video.title}</p>
            </div>
          )}
        </div>
      );
    }

    switch (source.type) {
      case 'youtube':
      case 'vimeo':
      case 'google-drive':
      case 'generic':
        return (
          <div className="w-full h-96 bg-black rounded-2xl overflow-hidden">
            <iframe
              src={source.url}
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={video.title}
            />
          </div>
        );

      case 'direct':
        return (
          <div className="w-full h-96 bg-black rounded-2xl overflow-hidden relative">
            <video
              controls
              autoPlay
              muted={isMuted}
              className="w-full h-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={source.url} type={`video/${source.url.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>

            {/* Custom controls for direct videos */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const video = document.querySelector('video');
                    if (video) {
                      video.muted = !video.muted;
                      setIsMuted(video.muted);
                    }
                  }}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const video = document.querySelector('video');
                    if (video) {
                      if (video.requestFullscreen) {
                        video.requestFullscreen();
                      }
                    }
                  }}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-96 bg-gray-800 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-white text-lg">Video Player</p>
              <p className="text-gray-400 text-sm mt-2">{video.title}</p>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors"
              >
                Open Video Link
              </a>
            </div>
          </div>
        );
    }
  };

  // Handle thumbnail image error
  const handleThumbnailError = (videoId) => {
    setThumbnailErrors(prev => ({
      ...prev,
      [videoId]: true
    }));
  };

  // Format video data with proper thumbnail URLs
  const formatVideoData = (data) => {
    return data.map(video => ({
      ...video,
      formattedThumbnail: formatThumbnailUrl(video.thumbnail)
    }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/video');
        const formattedData = formatVideoData(response.data);
        setVideoProjects(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load videos. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter navigation functions
  const scrollFilters = (direction) => {
    const container = filterContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newPosition = direction === 'left'
      ? filterScrollPosition - scrollAmount
      : filterScrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setFilterScrollPosition(newPosition);
  };

  const canScrollLeft = filterScrollPosition > 0;
  const canScrollRight = () => {
    const container = filterContainerRef.current;
    if (!container) return false;
    return filterScrollPosition < (container.scrollWidth - container.clientWidth);
  };

  // Update scroll position on container scroll
  useEffect(() => {
    const container = filterContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setFilterScrollPosition(container.scrollLeft);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic stats from video data
  const calculateStats = () => {
    if (videoProjects.length === 0) return stats;
    
    const totalVideos = videoProjects.length;
    const totalViews = videoProjects.reduce((sum, video) => sum + (video.views || 0), 0);
    const uniqueClients = [...new Set(videoProjects.map(v => v.client))].length;
    const uniqueCategories = [...new Set(videoProjects.flatMap(v => v.categories || []))].length;
    
    return [
      { number: `${totalVideos}+`, label: "Video Projects", icon: Play },
      { number: `${(totalViews / 1000000).toFixed(1)}M+`, label: "Total Views", icon: Eye },
      { number: "98%", label: "Client Satisfaction", icon: Star },
      { number: `${uniqueClients}+`, label: "Happy Clients", icon: Users }
    ];
  };

  const dynamicStats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lime-400 text-lg">Loading video portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Animated Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lime-500/10 border border-lime-500/20 backdrop-blur-sm mb-8 group cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(163, 230, 53, 0.15)" }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-lime-400" />
              </motion.div>
              <span className="text-lime-300 text-sm font-medium tracking-wider">
                VIDEO PORTFOLIO
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
            >
              VIDEO
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundSize: "200% 100%"
                }}
              >
                PROJECTS
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Explore our collection of stunning video projects that showcase our expertise in{" "}
              <span className="text-lime-400 font-semibold">editing, VFX, and motion graphics</span>
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {dynamicStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-lime-500/10 rounded-2xl blur-md group-hover:bg-lime-500/20 transition-all duration-300"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                    />
                    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-lime-500/50 transition-all duration-300">
                      <stat.icon className="w-8 h-8 text-lime-400 mx-auto mb-4" />
                      <motion.div
                        className="text-3xl font-bold text-lime-400 mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.2, type: "spring" }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Portfolio Section */}
      {videoProjects.length === 0 ? (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Play className="w-16 h-16 text-lime-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Videos Available</h2>
            <p className="text-gray-400 text-lg mb-8">
              Our video portfolio is being updated. Please check back soon!
            </p>
          </div>
        </section>
      ) : (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              {/* Navigation Arrows */}
              <AnimatePresence>
                {canScrollLeft && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => scrollFilters('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-lime-500/30 rounded-full flex items-center justify-center text-lime-400 hover:bg-lime-500/20 hover:border-lime-500/50 transition-all duration-300 shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {canScrollRight() && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => scrollFilters('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-lime-500/30 rounded-full flex items-center justify-center text-lime-400 hover:bg-lime-500/20 hover:border-lime-500/50 transition-all duration-300 shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Filter Buttons Container */}
              <div
                ref={filterContainerRef}
                className="flex overflow-x-auto scrollbar-hide gap-3 mx-12"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-500 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${activeFilter === filter.id
                      ? "bg-lime-500/20 border-lime-500 text-lime-400 shadow-2xl shadow-lime-500/25"
                      : "bg-gray-900/50 border-gray-600 text-gray-400 hover:border-lime-500/50 hover:text-lime-300"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="w-4 h-4" />
                    {filter.label}
                  </motion.button>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center mt-4">
                <div className="flex gap-1">
                  {filters.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${Math.floor((filterScrollPosition / (filterContainerRef.current?.scrollWidth || 1)) * filters.length) === index
                        ? 'bg-lime-400 w-3'
                        : 'bg-gray-600'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Video Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10">
                      {/* Video Thumbnail */}
                      <div className="relative overflow-hidden h-64">
                        {thumbnailErrors[video._id] || !video.formattedThumbnail ? (
                          <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-600 mb-2" />
                            <p className="text-gray-500 text-sm">No thumbnail</p>
                          </div>
                        ) : (
                          <img
                            src={video.formattedThumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={() => handleThumbnailError(video._id)}
                          />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Play Button */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="w-16 h-16 bg-lime-500/90 rounded-full flex items-center justify-center shadow-2xl">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </motion.div>

                        {/* Duration Badge */}
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1 text-white text-sm">
                            <Clock className="w-3 h-3" />
                            {video.duration}
                          </div>
                        </div>

                        {/* Categories Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1 max-w-[60%]">
                          {video.categories && video.categories.slice(0, 2).map((category, catIndex) => (
                            <span 
                              key={catIndex}
                              className="bg-lime-500/90 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium truncate"
                              title={category}
                            >
                              {category}
                            </span>
                          ))}
                          {video.categories && video.categories.length > 2 && (
                            <span className="bg-lime-700/90 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium">
                              +{video.categories.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Client Badge */}
                        {video.client && (
                          <div className="absolute bottom-4 left-4 bg-purple-500/90 backdrop-blur-sm rounded-full px-3 py-1 max-w-[70%]">
                            <div className="text-white text-sm font-medium truncate" title={video.client}>
                              {video.client}
                            </div>
                          </div>
                        )}

                        {/* Stats Badge */}
                        <div className="absolute bottom-4 right-4 bg-blue-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1 text-white text-xs">
                            <Eye className="w-3 h-3" />
                            {video.views ? (video.views > 1000 ? `${(video.views/1000).toFixed(1)}K` : video.views) : '0'}
                          </div>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                          {video.title}
                        </h3>

                        {/* Description with Line Breaks */}
                        <div className="text-gray-400 text-sm mb-4 line-clamp-3 min-h-[60px] whitespace-pre-line">
                          {formatDescription(video.description)}
                        </div>

                        {/* Categories Display */}
                        {video.categories && video.categories.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-400 mb-1">Categories:</p>
                            <div className="flex flex-wrap gap-1">
                              {video.categories.slice(0, 3).map((category, catIndex) => (
                                <span
                                  key={catIndex}
                                  className="px-2 py-1 bg-lime-500/10 text-lime-400 text-xs rounded-md border border-lime-500/20 truncate max-w-[100px]"
                                  title={category}
                                >
                                  {category}
                                </span>
                              ))}
                              {video.categories.length > 3 && (
                                <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-md">
                                  +{video.categories.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {video.tags && video.tags.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-400 mb-1">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                              {video.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20 truncate max-w-[80px]"
                                  title={tag}
                                >
                                  {tag}
                                </span>
                              ))}
                              {video.tags.length > 3 && (
                                <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-md">
                                  +{video.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Video Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{video.views?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{video.likes?.toLocaleString() || 0}</span>
                            </div>
                          </div>
                          {video.videoUrl && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(video.videoUrl, '_blank');
                              }}
                              className="px-3 py-1 bg-lime-500/10 text-lime-400 text-xs rounded-lg hover:bg-lime-500/20 transition-colors"
                            >
                              Watch
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results Message */}
            {filteredVideos.length === 0 && videoProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
                <p className="text-gray-400">
                  No videos match the selected category. Try choosing a different filter.
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors"
                >
                  Show All Videos
                </button>
              </motion.div>
            )}

            {/* Results Count */}
            {filteredVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mt-12 text-gray-400"
              >
                Showing {filteredVideos.length} of {videoProjects.length} videos
                {activeFilter !== "all" && (
                  <span> in "{filters.find(f => f.id === activeFilter)?.label}"</span>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated Background */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-purple-500/10 rounded-3xl blur-3xl"
            />

            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-12 shadow-2xl">
              <motion.h2
                className="text-5xl md:text-7xl font-black text-white mb-8"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(163, 230, 53, 0.5)",
                    "0 0 40px rgba(163, 230, 53, 0.8)",
                    "0 0 20px rgba(163, 230, 53, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                READY TO <span className="text-lime-400">CREATE</span>?
              </motion.h2>

              <motion.p
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Let's bring your vision to life with our professional video production services
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={'/contact'}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 flex items-center gap-3 text-lg"
                  >
                    <Play className="w-6 h-6" />
                    Start Video Project
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link href={'/portfolio'}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-transparent border-2 border-lime-500 text-lime-400 hover:bg-lime-500/10 font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 text-lg"
                  >
                    View Full Portfolio
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedVideo(null);
              setIsPlaying(false);
              setIsMuted(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Video Player */}
                {renderVideoPlayer(selectedVideo)}

                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedVideo(null);
                    setIsPlaying(false);
                    setIsMuted(false);
                  }}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                
                {/* Description with Line Breaks in Modal */}
                <div className="text-gray-400 mb-4 whitespace-pre-line">
                  {formatDescription(selectedVideo.description)}
                </div>
                
                {/* Categories in Modal */}
                {selectedVideo.categories && selectedVideo.categories.length > 0 && (
                  <div className="mb-4">
                    <p className="text-lime-400 font-semibold mb-2">Categories:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.categories.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="px-3 py-1 bg-lime-500/10 text-lime-400 text-sm rounded-lg border border-lime-500/20"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="text-purple-400 font-semibold">{selectedVideo.client}</div>
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedVideo.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedVideo.views?.toLocaleString() || 0} views
                    </div>
                  </div>
                </div>

                {/* Tags in Modal */}
                {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-blue-400 font-semibold mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-lg border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                  {selectedVideo.videoUrl && (
                    <a
                      href={selectedVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-lg transition-colors text-center font-medium"
                    >
                      Watch on Original Platform
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSelectedVideo(null);
                      setIsPlaying(false);
                      setIsMuted(false);
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideosPage;