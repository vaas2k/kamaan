// app/admin/dashboard/components/ModelsTab.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, Edit, Cuboid, Play, Zap, Cpu, X, Tag } from 'lucide-react';
import axios, { AxiosError } from 'axios';

const ModelsTab = () => {
  const [models, setModels] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    duration: '',
    thumbnail: '',
    videoUrl: '',
    description: '',
    client: '',
    tags: [],
    features: [],
    polyCount: '',
    renderTime: ''
  });

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('/api/admin/model3d');
      const data = response.data;
      setModels(data);
    } catch (error) {
      console.error('Error fetching 3D models:', error);
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

  const handleAddModel = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post('/api/admin/model3d', formData);

      if(req.status === 200) {
        console.log('3D Model added successfully:', req.data);
        fetchModels();
        setShowAddForm(false);
        setFormData({
          title: '',
          category: '',
          type: '',
          duration: '',
          thumbnail: '',
          videoUrl: '',
          description: '',
          client: '',
          tags: [],
          features: [],
          polyCount: '',
          renderTime: ''
        });
      }
    } catch (error) {
      console.error('Error adding 3D model:', error);  
      if(error instanceof AxiosError) {
        console.error('Axios error details:', error.response);
      }
    }
  };

  const handleDeleteModel = async (id) => {
    if (confirm('Are you sure you want to delete this 3D model?')) {
      try {
        console.log('Attempting to delete 3D model with id:', id);
        const req = await axios.delete(`/api/admin/model3d?id=${id}`);

        if(req.status === 200) {
          console.log('3D Model deleted successfully:', req.data);
          fetchModels();
        }
      } catch (error) {
        console.error('Error deleting 3D model:', error);
        if(error instanceof AxiosError) {
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
          <h2 className="text-2xl font-bold text-white">3D Models & Animations</h2>
          <p className="text-gray-400">Manage your 3D modeling and animation portfolio</p>
        </div>
        <motion.button
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add 3D Model
        </motion.button>
      </div>

      {/* Add 3D Model Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 border border-lime-500/20 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-lime-400 mb-4">Add New 3D Model</h3>
            <form onSubmit={handleAddModel} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Model Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Category (architectural, product, character, etc.)"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Type (visualization, modeling, animation)"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 3 weeks)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Video URL"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="url"
                  placeholder="Thumbnail URL"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                />
                <input
                  type="text"
                  placeholder="Polygon Count (e.g., 2.5M)"
                  value={formData.polyCount}
                  onChange={(e) => setFormData({ ...formData, polyCount: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Render Time (e.g., 8 hours)"
                  value={formData.renderTime}
                  onChange={(e) => setFormData({ ...formData, renderTime: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
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
                <label className="block text-sm font-medium text-lime-400">Software & Tools</label>
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
                    placeholder="Add software/tool (Blender, Maya, etc.)"
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
                <p className="text-gray-400 text-xs">Add 3D software and tools used</p>
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
                <p className="text-gray-400 text-xs">Add key features and techniques used</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add 3D Model
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {models.map((model, index) => (
            <motion.div
              key={model._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-lime-500/20 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-700">
                <img
                  src={model.thumbnail}
                  alt={model.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-lime-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {model.category}
                  </span>
                  <span className="bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {model.type}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Cuboid className="w-3 h-3" />
                    {model.polyCount}
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Zap className="w-3 h-3" />
                    {model.renderTime}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{model.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{model.client}</p>
                
                {/* Tags Display */}
                {model.tags && model.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {model.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block bg-lime-500/10 text-lime-400 px-2 py-1 rounded text-xs border border-lime-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {model.tags.length > 3 && (
                      <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                        +{model.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Features Display */}
                {model.features && model.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {model.features.slice(0, 2).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="inline-block bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs border border-purple-500/20"
                      >
                        {feature}
                      </span>
                    ))}
                    {model.features.length > 2 && (
                      <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                        +{model.features.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                {/* Technical Info */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {model.duration}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <motion.a
                      href={model.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="View Video"
                    >
                      <Play className="w-4 h-4" />
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={() => handleDeleteModel(model._id)}
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

      {models.length === 0 && (
        <div className="text-center py-12">
          <Cuboid className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No 3D models found. Add your first 3D project!</p>
        </div>
      )}
    </div>
  );
};

export default ModelsTab;