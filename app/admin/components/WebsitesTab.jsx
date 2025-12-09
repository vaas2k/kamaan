// app/admin/dashboard/components/WebsitesTab.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, Edit, Globe, ExternalLink, Github, X, Tag, Zap, ChevronDown, Image as ImageIcon, Code, Clock } from 'lucide-react';
import axios, { AxiosError } from 'axios';

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

const WebsitesTab = () => {
  const [websites, setWebsites] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [thumbnailError, setThumbnailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Available categories
  const categories = [
    "E-Commerce",
    "Portfolio Websites",
    "Blogs Websites",
    "Business Websites",
    "Educational Platforms",
    "Social Media Apps",
    "Dashboard & Analytics",
    "SAAS Products",
    "Landing Pages"
  ];

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    type: '',
    duration: '',
    thumbnail: '',
    liveUrl: '',
    githubUrl: '',
    description: '',
    client: '',
    tags: [],
    features: []
  });

  useEffect(() => {
    fetchWebsites();
  }, []);

  // Update thumbnail preview when thumbnail URL changes
  useEffect(() => {
    if (formData.thumbnail) {
      const formattedUrl = formatThumbnailUrl(formData.thumbnail);
      setThumbnailPreview(formattedUrl);
      setThumbnailError(false);
    } else {
      setThumbnailPreview('');
    }
  }, [formData.thumbnail]);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/web');
      const data = response.data.map(website => ({
        ...website,
        // Format thumbnail URLs for display
        formattedThumbnail: formatThumbnailUrl(website.thumbnail)
      }));
      setWebsites(data);
    } catch (error) {
      console.error('Error fetching websites:', error);
      alert('Failed to load websites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData({
      ...formData,
      features: formData.features.filter(feature => feature !== featureToRemove)
    });
  };

  // Handle category selection
  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const isSelected = prev.categories.includes(category);
      if (isSelected) {
        return {
          ...prev,
          categories: prev.categories.filter(cat => cat !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category]
        };
      }
    });
  };

  // Select/deselect all categories
  const handleSelectAllCategories = () => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.length === categories.length ? [] : [...categories]
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.categories.length === 0) newErrors.categories = 'Select at least one category';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.client.trim()) newErrors.client = 'Client name is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (formData.thumbnail.trim() && !isValidImage(formData.thumbnail)) {
      newErrors.thumbnail = 'Please enter a valid image URL (jpg, png, gif, webp)';
    }
    if (!formData.liveUrl.trim()) newErrors.liveUrl = 'Live URL is required';
    if (!formData.githubUrl.trim()) newErrors.githubUrl = 'GitHub URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preserve line breaks in description
      const websiteData = {
        ...formData,
        description: formData.description.trim()
      };
      
      const response = await axios.post('/api/admin/web', websiteData);

      if (response.status === 200) {
        console.log('Website added successfully:', response.data);
        
        // Reset form
        setFormData({
          title: '',
          categories: [],
          type: '',
          duration: '',
          thumbnail: '',
          liveUrl: '',
          githubUrl: '',
          description: '',
          client: '',
          tags: [],
          features: []
        });
        setThumbnailPreview('');
        setTagInput('');
        setFeatureInput('');
        setErrors({});
        
        // Refresh websites list
        fetchWebsites();
        
        // Hide form
        setShowAddForm(false);
        
        // Show success message
        alert('Website added successfully!');
      }
    } catch (error) {
      console.error('Error adding website:', error);
      if (error instanceof AxiosError) {
        console.error('Axios error details:', error.response);
        alert(`Failed to add website: ${error.response?.data?.message || error.message}`);
      } else {
        alert('Failed to add website. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWebsite = async (id) => {
    if (!confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
      return;
    }
    
    try {
      console.log('Attempting to delete website with id:', id);
      const response = await axios.delete(`/api/admin/web?id=${id}`);

      if (response.status === 200) {
        console.log('Website deleted successfully:', response.data);
        
        // Refresh websites list
        fetchWebsites();
        
        // Show success message
        alert('Website deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting website:', error);
      if (error instanceof AxiosError) {
        console.error('Axios error details:', error.response);
        alert(`Failed to delete website: ${error.response?.data?.message || error.message}`);
      } else {
        alert('Failed to delete website. Please try again.');
      }
    }
  };

  // Handle image error
  const handleImageError = () => {
    setThumbnailError(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-lime-400 text-lg">Loading websites...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Website Projects</h2>
          <p className="text-gray-400">Manage your web development portfolio</p>
        </div>
        <motion.button
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Website
        </motion.button>
      </div>

      {/* Add Website Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 border border-lime-500/20 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-lime-400">Add New Website</h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setShowCategoryDropdown(false);
                }}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleAddWebsite} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Website Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter website title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (errors.title) setErrors({ ...errors, title: '' });
                    }}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                      errors.title ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                    required
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                  )}
                </div>
                
                {/* Categories */}
                <div className="relative">
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Categories * {formData.categories.length > 0 && `(${formData.categories.length} selected)`}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none flex justify-between items-center ${
                      errors.categories ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                  >
                    <span className="text-left">
                      {formData.categories.length === 0 
                        ? "Select Categories" 
                        : formData.categories.slice(0, 2).join(', ') + (formData.categories.length > 2 ? ` +${formData.categories.length - 2} more` : '')
                      }
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {errors.categories && (
                    <p className="mt-1 text-sm text-red-400">{errors.categories}</p>
                  )}

                  {/* Category Dropdown */}
                  {showCategoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 w-full mt-2 bg-gray-800 border border-lime-500/20 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                    >
                      <div className="p-2 border-b border-gray-700">
                        <button
                          type="button"
                          onClick={handleSelectAllCategories}
                          className="w-full text-left px-3 py-2 text-sm text-lime-400 hover:bg-lime-500/10 rounded-lg transition-colors"
                        >
                          {formData.categories.length === categories.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="p-2 space-y-1">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center px-3 py-2 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.categories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="w-4 h-4 text-lime-500 bg-gray-700 border-gray-600 rounded focus:ring-lime-500 focus:ring-2"
                            />
                            <span className="ml-3 text-sm text-white">{category}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Type *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Website, Web App, Dashboard, Mobile App"
                    value={formData.type}
                    onChange={(e) => {
                      setFormData({ ...formData, type: e.target.value });
                      if (errors.type) setErrors({ ...errors, type: '' });
                    }}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                      errors.type ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                    required
                  />
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-400">{errors.type}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 6 weeks, 3 months, 1 year"
                    value={formData.duration}
                    onChange={(e) => {
                      setFormData({ ...formData, duration: e.target.value });
                      if (errors.duration) setErrors({ ...errors, duration: '' });
                    }}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                      errors.duration ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                    required
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-400">{errors.duration}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Live URL */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Live URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.liveUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, liveUrl: e.target.value });
                      if (errors.liveUrl) setErrors({ ...errors, liveUrl: '' });
                    }}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                      errors.liveUrl ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                    required
                  />
                  {errors.liveUrl && (
                    <p className="mt-1 text-sm text-red-400">{errors.liveUrl}</p>
                  )}
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={formData.githubUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, githubUrl: e.target.value });
                      if (errors.githubUrl) setErrors({ ...errors, githubUrl: '' });
                    }}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                      errors.githubUrl ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                    required
                  />
                  {errors.githubUrl && (
                    <p className="mt-1 text-sm text-red-400">{errors.githubUrl}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thumbnail URL */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Thumbnail URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="Google Drive or image URL"
                      value={formData.thumbnail}
                      onChange={(e) => {
                        setFormData({ ...formData, thumbnail: e.target.value });
                        if (errors.thumbnail) setErrors({ ...errors, thumbnail: '' });
                      }}
                      className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                        errors.thumbnail ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-3">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-400">{errors.thumbnail}</p>
                  )}
                  
                  {/* Thumbnail Preview */}
                  {thumbnailPreview && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-lime-400 mb-2">
                        Thumbnail Preview
                      </label>
                      <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden border border-lime-500/20">
                        {thumbnailError ? (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                            <ImageIcon className="w-12 h-12 mb-2" />
                            <p className="text-sm">Failed to load thumbnail</p>
                          </div>
                        ) : (
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        Tip: For Google Drive, use the shareable link
                      </p>
                    </div>
                  )}
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Client *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={formData.client}
                    onChange={(e) => {
                      setFormData({ ...formData, client: e.target.value });
                      if (errors.client) setErrors({ ...errors, client: '' });
                    }}
                    className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none ${
                      errors.client ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                    }`}
                    required
                  />
                  {errors.client && (
                    <p className="mt-1 text-sm text-red-400">{errors.client}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-lime-400">
                    Description *
                  </label>
                  <span className="text-xs text-gray-400">
                    {formData.description.length} characters
                  </span>
                </div>
                <textarea
                  placeholder="Enter website description...
You can use line breaks for better formatting...
- Key feature 1
- Key feature 2
- Key feature 3"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  rows="5"
                  className={`w-full p-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none whitespace-pre-wrap ${
                    errors.description ? 'border-red-500' : 'border-lime-500/20 focus:border-lime-500'
                  }`}
                  required
                />
                <div className="flex justify-between mt-1">
                  {errors.description && (
                    <p className="text-sm text-red-400">{errors.description}</p>
                  )}
                  <p className="text-xs text-gray-400 ml-auto">
                    Press Enter for new lines
                  </p>
                </div>
                
                {/* Description Preview */}
                {formData.description && (
                  <div className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                    <p className="text-xs text-lime-400 mb-2 font-medium">Preview:</p>
                    <div className="text-gray-300 text-sm whitespace-pre-wrap min-h-[60px] p-2 bg-gray-900/30 rounded">
                      {formatDescription(formData.description)}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-lime-400">Technologies & Tags</label>
                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                  {formData.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 bg-lime-500/20 text-lime-400 px-3 py-1 rounded-full text-sm border border-lime-500/30"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-lime-300 transition-colors ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                  {formData.tags.length === 0 && (
                    <span className="text-gray-500 text-sm">No tags added yet</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a technology tag and press Enter..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(e);
                      }
                    }}
                    className="flex-1 p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  />
                  <motion.button
                    type="button"
                    onClick={handleAddTag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-lime-500/20 border border-lime-500/30 text-lime-400 px-4 py-3 rounded-xl hover:bg-lime-500/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Add
                  </motion.button>
                </div>
                <p className="text-gray-400 text-xs">Add technologies used (React, Node.js, MongoDB, etc.)</p>
              </div>

              {/* Features Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-lime-400">Key Features</label>
                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                  {formData.features.map((feature, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="hover:text-purple-300 transition-colors ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                  {formData.features.length === 0 && (
                    <span className="text-gray-500 text-sm">No features added yet</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a key feature and press Enter..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature(e);
                      }
                    }}
                    className="flex-1 p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  />
                  <motion.button
                    type="button"
                    onClick={handleAddFeature}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-3 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Add
                  </motion.button>
                </div>
                <p className="text-gray-400 text-xs">Add key features of the website</p>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-500/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding Website...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Website
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowCategoryDropdown(false);
                    setErrors({});
                    setThumbnailPreview('');
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Websites Grid */}
      {websites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {websites.map((website, index) => (
              <motion.div
                key={website._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 border border-lime-500/20 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-700 overflow-hidden">
                  {website.formattedThumbnail ? (
                    <img
                      src={website.formattedThumbnail}
                      alt={website.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/default-thumbnail.jpg';
                        e.target.className = "w-full h-full object-contain bg-gray-800 p-4";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                      <Globe className="w-12 h-12 mb-2" />
                      <p className="text-sm">No thumbnail</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {website.type}
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 left-3 bg-purple-500/90 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {website.duration}
                  </div>
                  
                  {/* Categories Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 max-w-[60%]">
                    {website.categories && website.categories.slice(0, 2).map((category, catIndex) => (
                      <span 
                        key={catIndex}
                        className="bg-lime-500/90 text-white px-2 py-1 rounded text-xs font-medium truncate"
                        title={category}
                      >
                        {category}
                      </span>
                    ))}
                    {website.categories && website.categories.length > 2 && (
                      <span className="bg-lime-700/90 text-white px-2 py-1 rounded text-xs font-medium">
                        +{website.categories.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 h-12" title={website.title}>
                    {website.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Code className="w-4 h-4" />
                    <span className="truncate" title={website.client}>{website.client}</span>
                  </div>

                  {/* Description with Line Breaks */}
                  <div className="text-gray-400 text-sm mb-3 line-clamp-3 min-h-[60px] whitespace-pre-line">
                    {formatDescription(website.description)}
                  </div>

                  {/* Categories Display */}
                  {website.categories && website.categories.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-400 mb-1">Categories:</p>
                      <div className="flex flex-wrap gap-1">
                        {website.categories.slice(0, 3).map((category, catIndex) => (
                          <span
                            key={catIndex}
                            className="inline-block bg-lime-500/10 text-lime-400 px-2 py-1 rounded text-xs border border-lime-500/20 truncate max-w-[100px]"
                            title={category}
                          >
                            {category}
                          </span>
                        ))}
                        {website.categories.length > 3 && (
                          <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                            +{website.categories.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tags Display */}
                  {website.tags && website.tags.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-400 mb-1">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {website.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block bg-lime-500/10 text-lime-400 px-2 py-1 rounded text-xs border border-lime-500/20 truncate max-w-[80px]"
                            title={tag}
                          >
                            {tag}
                          </span>
                        ))}
                        {website.tags.length > 3 && (
                          <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                            +{website.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Features Display */}
                  {website.features && website.features.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-1">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {website.features.slice(0, 2).map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="inline-block bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs border border-purple-500/20 truncate max-w-[100px]"
                            title={feature}
                          >
                            {feature}
                          </span>
                        ))}
                        {website.features.length > 2 && (
                          <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                            +{website.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <div className="flex gap-2">
                      <motion.a
                        href={website.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={website.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                        title="Edit"
                        onClick={() => alert('Edit functionality coming soon!')}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <motion.button
                      onClick={() => handleDeleteWebsite(website._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800/30 rounded-2xl border border-lime-500/20">
          <div className="w-24 h-24 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-12 h-12 text-lime-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No websites yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Start building your web development portfolio by adding your first website project.
          </p>
          <motion.button
            onClick={() => setShowAddForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-xl transition-all duration-300 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add Your First Website
          </motion.button>
        </div>
      )}

      {/* Stats Summary */}
      {websites.length > 0 && (
        <div className="bg-gray-800/30 rounded-2xl p-6 border border-lime-500/20 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Website Portfolio Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-lime-400">{websites.length}</div>
              <div className="text-gray-400 text-sm">Total Websites</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-lime-400">
                {[...new Set(websites.flatMap(w => w.categories || []))].length}
              </div>
              <div className="text-gray-400 text-sm">Active Categories</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-lime-400">
                {[...new Set(websites.flatMap(w => w.tags || []))].length}
              </div>
              <div className="text-gray-400 text-sm">Technologies Used</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-lime-400">
                {[...new Set(websites.map(w => w.client))].length}
              </div>
              <div className="text-gray-400 text-sm">Unique Clients</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesTab; 