"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cuboid, Box, Zap, Sparkles, Filter, Eye, Heart, Share2,
  ArrowRight, RotateCw, Play, Pause, Volume2, VolumeX,
  Maximize, Users, Star, Award, Camera, X, Clock
} from "lucide-react";
import axios from "axios";
import Link from "next/link";

const Models3DPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedModel, setSelectedModel] = useState(null);
  const [hoveredModel, setHoveredModel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [modelProjects, setModelProjects] = useState([]);
  const [loading, setLoading] = useState(true);

 const filters = [
  { id: "all", label: "All Projects" },
  { id: "Character Animation", label: "Character Animation" },
  { id: "Architectural Visualization", label: "Architectural" },
  { id: "3D Floor Plans", label: "3D Floor Plans" },
  { id: "Product Modeling", label: "Product Modeling" },
  { id: "Character Modeling", label: "Character Modeling" },
  { id: "Environment Design", label: "Environment" },
  { id: "Motion Graphics", label: "Motion Graphics" },
  { id: "VFX", label: "VFX" },
  { id: "Game Assets", label: "Game Assets" },
  { id: "Medical Visualization", label: "Medical" }
];

  const typeIcons = {
    "visualization": Camera,
    "modeling": Cuboid,
    "animation": Play,
    "nigga": Cuboid // Fallback for your current data
  };

  const stats = [
    { number: "60+", label: "3D Projects", icon: Cuboid },
    { number: "2.5M+", label: "Total Views", icon: Eye },
    { number: "97%", label: "Client Satisfaction", icon: Star },
    { number: "15+", label: "Software Tools", icon: Zap }
  ];

  // Safely get filtered models
  // const filteredModels = activeFilter === "all"
  //   ? modelProjects
  //   : modelProjects.filter(model => model.category === activeFilter);


  // Updated filtering logic to handle multiple categories
  const filteredModels = activeFilter === "all"
    ? modelProjects
    : modelProjects.filter(model =>
      model.categories && model.categories.includes(activeFilter)
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
  const renderVideoPlayer = (model) => {
    const source = getVideoSource(model.videoUrl);

    if (!source) {
      return (
        <div className="w-full h-96 bg-gray-800 rounded-2xl flex items-center justify-center">
          <img
           src={model.thumbnail}
           className="w-full h-full object-contain"
           />
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
              title={model.title}
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
              <p className="text-gray-400 text-sm mt-2">{model.title}</p>
              <a
                href={model.videoUrl}
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

  useEffect(() => {
    async function fetchModelProjects() {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/model3d');
        if (response.status === 200) {
          // console.log("Fetched 3D Models:", response.data);
          setModelProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching 3D models:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModelProjects();
  }, []);

  // Safe data access functions
  const getTypeIcon = (model) => {
    const IconComponent = typeIcons[model.type] || Cuboid;
    return <IconComponent className="w-3 h-3" />;
  };

  const getFeatures = (model) => {
    if (!model.features) return [];
    return Array.isArray(model.features) ? model.features : [model.features];
  };

  const getTags = (model) => {
    if (!model.tags) return [];
    return Array.isArray(model.tags) ? model.tags : [model.tags];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
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
                3D & ANIMATION PORTFOLIO
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
            >
              3D
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
              Explore our collection of stunning 3D projects and animations created with{" "}
              <span className="text-lime-400 font-semibold">cutting-edge technology and artistic vision</span>
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
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

      {/* 3D Models Portfolio Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-500 flex items-center gap-2 ${activeFilter === filter.id
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
          </motion.div>

          {/* 3D Models Grid */}
          {modelProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">No 3D projects found</div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredModels.map((model, index) => (
                  <motion.div
                    key={model._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredModel(model._id)}
                    onMouseLeave={() => setHoveredModel(null)}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full flex flex-col">
                      {/* Model Thumbnail */}
                      <div className="relative overflow-hidden flex-1">
                        <img
                          src={model.thumbnail}
                          alt={model.title}
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />

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

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1 text-white text-sm">
                            {getTypeIcon(model)}
                            {model.type || '3D Model'}
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1 text-white text-sm">
                            <Clock className="w-3 h-3" />
                            {model.duration || 'N/A'}
                          </div>
                        </div>

                        {/* Technical Info */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                          <div className="bg-lime-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <div className="flex items-center gap-1 text-white text-sm">
                              <Cuboid className="w-3 h-3" />
                              {model.polyCount || 'N/A'} polys
                            </div>
                          </div>
                          <div className="bg-purple-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <div className="flex items-center gap-1 text-white text-sm">
                              <Zap className="w-3 h-3" />
                              {model.renderTime || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Model Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-300 line-clamp-2">
                          {model.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {model.description}
                        </p>

                        {/* Features */}
                        {getFeatures(model).length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-lime-400 mb-2">Key Features:</h4>
                            <div className="flex flex-wrap gap-1">
                              {getFeatures(model).slice(0, 3).map((feature, featureIndex) => (
                                <span
                                  key={featureIndex}
                                  className="px-2 py-1 bg-lime-500/10 text-lime-400 text-xs rounded-md border border-lime-500/20"
                                >
                                  {feature}
                                </span>
                              ))}
                              {getFeatures(model).length > 3 && (
                                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                                  +{getFeatures(model).length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Software Tags */}
                        {getTags(model).length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {getTags(model).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between text-gray-400 text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {model.views || '0'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {model.likes || '0'}
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-lime-400 hover:text-lime-300 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Share functionality
                            }}
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            {/* <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 flex items-center gap-3 mx-auto"
            >
              <span>Load More Projects</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button> */}
          </motion.div>
        </div>
      </section>

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
                Let's bring your 3D vision to life with our expert modeling and animation services
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
                    <Cuboid className="w-6 h-6" />
                    Start 3D Project
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Model Modal */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedModel(null);
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
                {renderVideoPlayer(selectedModel)}

                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedModel(null);
                    setIsPlaying(false);
                    setIsMuted(false);
                  }}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedModel.title}</h3>
                <p className="text-gray-400 mb-4">{selectedModel.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-lime-400 font-semibold">{selectedModel.client}</div>
                  <div className="text-gray-400 text-sm">{selectedModel.duration}</div>
                </div>

                {/* Technical Info */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <Cuboid className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                    <div className="text-white font-bold">{selectedModel.polyCount || 'N/A'}</div>
                    <div className="text-gray-400 text-sm">Polygon Count</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <Zap className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                    <div className="text-white font-bold">{selectedModel.renderTime || 'N/A'}</div>
                    <div className="text-gray-400 text-sm">Render Time</div>
                  </div>
                </div>

                {/* Features */}
                {getFeatures(selectedModel).length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-white mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getFeatures(selectedModel).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Software Tags */}
                {getTags(selectedModel).length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-white mb-3">Software Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {getTags(selectedModel).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-lime-500/10 text-lime-400 text-sm rounded-lg border border-lime-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Models3DPage;