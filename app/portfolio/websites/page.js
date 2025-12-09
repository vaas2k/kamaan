"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, ArrowRight, Sparkles, Filter,
  Eye, Heart, Share2, Zap, Star, Users, Clock,
  Smartphone, Monitor, Globe, Code, X, Image as ImageIcon
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

const WebsitesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [hoveredWebsite, setHoveredWebsite] = useState(null);
  const [websiteProjects, setWebsiteProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbnailErrors, setThumbnailErrors] = useState({});

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "E-Commerce", label: "E-Commerce" },
    { id: "Portfolio Websites", label: "Portfolio" },
    { id: "Blogs Websites", label: "Blogs" },
    { id: "Business Websites", label: "Business" },
    { id: "Educational Platforms", label: "Educational" },
    { id: "Social Media Apps", label: "Social Media" },
    { id: "Dashboard & Analytics", label: "Dashboard" },
    { id: "SAAS Products", label: "SAAS" },
    { id: "Landing Pages", label: "Landing Pages" }
  ];

  const typeIcons = {
    "website": Monitor,
    "web-app": Globe,
    "dashboard": Code,
    "mobile-app": Smartphone,
    "default": Globe
  };

  const stats = [
    { number: "80+", label: "Web Projects", icon: Globe },
    { number: "1.5M+", label: "Total Views", icon: Eye },
    { number: "99%", label: "Client Satisfaction", icon: Star },
    { number: "50+", label: "Technologies", icon: Zap }
  ];

  // Safe data access functions
  const getFeatures = (website) => {
    if (!website?.features) return [];
    return Array.isArray(website.features) ? website.features : [website.features];
  };

  const getTags = (website) => {
    if (!website?.tags) return [];
    return Array.isArray(website.tags) ? website.tags : [website.tags];
  };

  const getCategories = (website) => {
    if (!website?.categories) return [];
    return Array.isArray(website.categories) ? website.categories : [website.categories];
  };

  const getTypeIcon = (website) => {
    const IconComponent = typeIcons[website?.type?.toLowerCase()] || typeIcons.default;
    return <IconComponent className="w-3 h-3" />;
  };

  // Format website data with proper thumbnail URLs
  const formatWebsiteData = (data) => {
    return data.map(website => ({
      ...website,
      formattedThumbnail: formatThumbnailUrl(website.thumbnail)
    }));
  };

  // Handle thumbnail image error
  const handleThumbnailError = (websiteId) => {
    setThumbnailErrors(prev => ({
      ...prev,
      [websiteId]: true
    }));
  };

  // Calculate dynamic stats from website data
  const calculateStats = () => {
    if (websiteProjects.length === 0) return stats;
    
    const totalWebsites = websiteProjects.length;
    const totalViews = websiteProjects.reduce((sum, website) => sum + (website.views || 0), 0);
    const uniqueTechnologies = [...new Set(websiteProjects.flatMap(w => getTags(w)))].length;
    const uniqueClients = [...new Set(websiteProjects.map(w => w.client))].length;
    
    return [
      { number: `${totalWebsites}+`, label: "Web Projects", icon: Globe },
      { number: `${(totalViews / 1000000).toFixed(1)}M+`, label: "Total Views", icon: Eye },
      { number: `${uniqueClients}+`, label: "Happy Clients", icon: Star },
      { number: `${uniqueTechnologies}+`, label: "Technologies", icon: Zap }
    ];
  };

  const filteredWebsites = activeFilter === "all"
    ? websiteProjects
    : websiteProjects.filter(website =>
      website.categories && website.categories.includes(activeFilter)
    );

  const dynamicStats = calculateStats();

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

  useEffect(() => {
    async function fetchWebsites() {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/web');
        if (response.status === 200) {
          const formattedData = formatWebsiteData(response.data);
          console.log("Formatted Website Projects:", formattedData);
          setWebsiteProjects(formattedData);
        }
      } catch (error) {
        console.error("Error fetching website projects:", error);
        alert('Failed to load website projects. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchWebsites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lime-400 text-lg">Loading website portfolio...</p>
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
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
                WEB DEVELOPMENT PORTFOLIO
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
            >
              WEB
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
              Discover our collection of stunning websites and web applications built with{" "}
              <span className="text-lime-400 font-semibold">modern technologies and best practices</span>
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

      {/* Websites Portfolio Section */}
      {websiteProjects.length === 0 ? (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Globe className="w-16 h-16 text-lime-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Website Projects Available</h2>
            <p className="text-gray-400 text-lg mb-8">
              Our web development portfolio is being updated. Please check back soon!
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

            {/* Websites Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredWebsites.map((website, index) => (
                  <motion.div
                    key={website._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredWebsite(website._id)}
                    onMouseLeave={() => setHoveredWebsite(null)}
                    onClick={() => setSelectedWebsite(website)}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full flex flex-col">
                      {/* Website Thumbnail */}
                      <div className="relative overflow-hidden flex-1 h-64">
                        {thumbnailErrors[website._id] || !website.formattedThumbnail ? (
                          <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-600 mb-2" />
                            <p className="text-gray-500 text-sm">No preview available</p>
                          </div>
                        ) : (
                          <img
                            src={website.formattedThumbnail}
                            alt={website.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={() => handleThumbnailError(website._id)}
                          />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Action Buttons */}
                        <motion.div
                          className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                          initial={false}
                          animate={hoveredWebsite === website._id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        >
                          <motion.a
                            href={website.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-lime-500 hover:bg-lime-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </motion.a>
                          <motion.a
                            href={website.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4 text-white" />
                          </motion.a>
                        </motion.div>

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1 text-white text-sm">
                            {getTypeIcon(website)}
                            {website.type?.replace('-', ' ') || 'Website'}
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-4 left-4 bg-lime-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center gap-1 text-white text-sm">
                            <Clock className="w-3 h-3" />
                            {website.duration || 'N/A'}
                          </div>
                        </div>

                        {/* Categories Badges */}
                        <div className="absolute top-12 left-4 flex flex-wrap gap-1 max-w-[60%]">
                          {getCategories(website).slice(0, 2).map((category, catIndex) => (
                            <span 
                              key={catIndex}
                              className="bg-blue-500/90 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium truncate"
                              title={category}
                            >
                              {category}
                            </span>
                          ))}
                          {getCategories(website).length > 2 && (
                            <span className="bg-blue-700/90 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium">
                              +{getCategories(website).length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Website Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                          {website.title}
                        </h3>

                        {/* Description with Line Breaks */}
                        <div className="text-gray-400 text-sm mb-4 line-clamp-3 min-h-[60px] whitespace-pre-line">
                          {formatDescription(website.description)}
                        </div>

                        {/* Client */}
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                          <Users className="w-4 h-4" />
                          <span className="truncate" title={website.client}>{website.client}</span>
                        </div>

                        {/* Features */}
                        {getFeatures(website).length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-lime-400 mb-2">Key Features:</h4>
                            <div className="flex flex-wrap gap-1">
                              {getFeatures(website).slice(0, 3).map((feature, featureIndex) => (
                                <span
                                  key={featureIndex}
                                  className="px-2 py-1 bg-lime-500/10 text-lime-400 text-xs rounded-md border border-lime-500/20 truncate max-w-[100px]"
                                  title={feature}
                                >
                                  {feature}
                                </span>
                              ))}
                              {getFeatures(website).length > 3 && (
                                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                                  +{getFeatures(website).length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {getTags(website).length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-blue-400 mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-1">
                              {getTags(website).slice(0, 4).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20 truncate max-w-[80px]"
                                  title={tag}
                                >
                                  {tag}
                                </span>
                              ))}
                              {getTags(website).length > 4 && (
                                <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-md">
                                  +{getTags(website).length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Categories Display */}
                        {getCategories(website).length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-400 mb-1">Categories:</p>
                            <div className="flex flex-wrap gap-1">
                              {getCategories(website).slice(0, 3).map((category, catIndex) => (
                                <span
                                  key={catIndex}
                                  className="px-2 py-1 bg-lime-500/10 text-lime-400 text-xs rounded-md border border-lime-500/20 truncate max-w-[100px]"
                                  title={category}
                                >
                                  {category}
                                </span>
                              ))}
                              {getCategories(website).length > 3 && (
                                <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-md">
                                  +{getCategories(website).length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results Message */}
            {filteredWebsites.length === 0 && websiteProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No websites found</h3>
                <p className="text-gray-400">
                  No websites match the selected category. Try choosing a different filter.
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors"
                >
                  Show All Websites
                </button>
              </motion.div>
            )}

            {/* Results Count */}
            {filteredWebsites.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mt-12 text-gray-400"
              >
                Showing {filteredWebsites.length} of {websiteProjects.length} websites
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
              className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-blue-500/10 rounded-3xl blur-3xl"
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
                READY TO <span className="text-lime-400">BUILD</span>?
              </motion.h2>

              <motion.p
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Let's create an amazing website or web application for your business
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
                    <Code className="w-6 h-6" />
                    Start Web Project
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

      {/* Website Modal */}
      <AnimatePresence>
        {selectedWebsite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedWebsite(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Website Preview */}
                <div className="w-full h-64 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                  {selectedWebsite.formattedThumbnail ? (
                    <img
                      src={selectedWebsite.formattedThumbnail}
                      alt={selectedWebsite.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-thumbnail.jpg';
                        e.target.className = "w-full h-full object-contain bg-gray-800 p-4";
                      }}
                    />
                  ) : (
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-gray-600 mb-4" />
                      <p className="text-gray-400">Website Preview</p>
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedWebsite(null)}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                  <motion.a
                    href={selectedWebsite.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Live Site
                  </motion.a>
                  <motion.a
                    href={selectedWebsite.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </motion.a>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedWebsite.title}</h3>
                  
                  {/* Description with Line Breaks in Modal */}
                  <div className="text-gray-400 mb-4 whitespace-pre-line">
                    {formatDescription(selectedWebsite.description)}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lime-400 font-semibold">{selectedWebsite.client}</div>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedWebsite.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(selectedWebsite)}
                        {selectedWebsite.type?.replace('-', ' ') || 'Website'}
                      </div>
                    </div>
                  </div>
                </div>

                {getFeatures(selectedWebsite).length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getFeatures(selectedWebsite).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {getTags(selectedWebsite).length > 0 && (
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="text-xl font-bold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {getTags(selectedWebsite).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-lg border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {getCategories(selectedWebsite).length > 0 && (
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="text-xl font-bold text-white mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {getCategories(selectedWebsite).map((category, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-lime-500/10 text-lime-400 text-sm rounded-lg border border-lime-500/20"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                  <button
                    onClick={() => setSelectedWebsite(null)}
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

export default WebsitesPage;