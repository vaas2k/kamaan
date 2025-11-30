// app/admin/dashboard/components/WebsitesTab.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, Edit, Globe, ExternalLink, Github, X, Tag, Zap, ChevronDown } from 'lucide-react';
import axios, { AxiosError } from 'axios';

const WebsitesTab = () => {
  const [websites, setWebsites] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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
    categories: [], // Changed from category to categories (array)
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

  const fetchWebsites = async () => {
    try {
      const response = await axios.get('/api/admin/web');
      const data = response.data;
      setWebsites(data);
    } catch (error) {
      console.error('Error fetching websites:', error);
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

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post('/api/admin/web', formData);

      if (req.status === 200) {
        console.log('Website added successfully:', req.data);
        fetchWebsites();
        setShowAddForm(false);
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
      }
    } catch (error) {
      console.error('Error adding website:', error);
      if (error instanceof AxiosError) {
        console.error('Axios error details:', error.response);
      }
    }
  };

  const handleDeleteWebsite = async (id) => {
    if (confirm('Are you sure you want to delete this website?')) {
      try {
        console.log('Attempting to delete website with id:', id);
        const req = await axios.delete(`/api/admin/web?id=${id}`);

        if (req.status === 200) {
          console.log('Website deleted successfully:', req.data);
          fetchWebsites();
        }
      } catch (error) {
        console.error('Error deleting website:', error);
        if (error instanceof AxiosError) {
          console.error('Axios error details:', error.response);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
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
            <h3 className="text-lg font-semibold text-lime-400 mb-4">Add New Website</h3>
            <form onSubmit={handleAddWebsite} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Website Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                
                {/* Multiple Category Selector */}
                <div className="relative">
                  <label className="block text-sm font-medium text-lime-400 mb-2">
                    Categories {formData.categories.length > 0 && `(${formData.categories.length} selected)`}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 flex justify-between items-center"
                  >
                    <span>
                      {formData.categories.length === 0 
                        ? "Select Categories" 
                        : formData.categories.slice(0, 2).join(', ') + (formData.categories.length > 2 ? ` +${formData.categories.length - 2} more` : '')
                      }
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>

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
                          className="w-full text-left px-3 py-2 text-sm text-lime-400 hover:bg-lime-500/10 rounded-lg"
                        >
                          {formData.categories.length === categories.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="p-2 space-y-1">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center px-3 py-2 hover:bg-gray-700/50 rounded-lg cursor-pointer"
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

                <input
                  type="text"
                  placeholder="Type (e.g., website, web-app, dashboard)"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 6 weeks)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Live URL"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Thumbnail URL"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                required
              />

              {/* Tags Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-lime-400">Technologies & Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
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
                        className="hover:text-lime-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a technology tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
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
                <div className="flex flex-wrap gap-2 mb-2">
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
                        className="hover:text-purple-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a key feature..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Website
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowCategoryDropdown(false);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {websites.map((website, index) => (
            <motion.div
              key={website._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-lime-500/20 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-700">
                <img
                  src={website.thumbnail}
                  alt={website.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {website.categories && website.categories.slice(0, 2).map((category, catIndex) => (
                    <span 
                      key={catIndex}
                      className="bg-lime-500/90 text-white px-2 py-1 rounded text-xs font-medium"
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
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {website.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-purple-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {website.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{website.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{website.client}</p>

                {/* Categories Display */}
                {website.categories && website.categories.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1">Categories:</p>
                    <div className="flex flex-wrap gap-1">
                      {website.categories.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="inline-block bg-lime-500/10 text-lime-400 px-2 py-1 rounded text-xs border border-lime-500/20"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags Display */}
                {website.tags && website.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {website.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block bg-lime-500/10 text-lime-400 px-2 py-1 rounded text-xs border border-lime-500/20"
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
                )}

                {/* Features Display */}
                {website.features && website.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {website.features.slice(0, 2).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="inline-block bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs border border-purple-500/20"
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
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
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

      {websites.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No websites found. Add your first website project!</p>
        </div>
      )}
    </div>
  );
};

export default WebsitesTab;