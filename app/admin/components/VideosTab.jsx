// app/admin/dashboard/components/VideosTab.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, Edit, Play, Clock, Users, X, Tag } from 'lucide-react';
import axios, { AxiosError } from 'axios';

const VideosTab = () => {
  const [videos, setVideos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState('');


  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    videoUrl: '',
    thumbnail: '',
    client: '',
    views: 0,
    likes: 0,
    tags: []
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      // Replace with actual API call
      const response = await axios.get('/api/admin/video');
      const data = response.data;
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
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

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post('/api/admin/video', formData);

      if(req.status === 200) {
        console.log('Video added successfully:', req.data);
        // Optionally, refresh the video list
        fetchVideos();
        setShowAddForm(false);
        setFormData({
          title: '',
          category: '',
          description: '',
          duration: '',
          videoUrl: '',
          thumbnail: '',
          client: '',
          views: 0,
          likes: 0,
          tags: []
        });
      }
    } catch (error) {
      console.error('Error adding video:', error);  
      if(error instanceof AxiosError) {
        console.error('Axios error details:', error.response);
      }
    }
  };

  const handleDeleteVideo = async (id) => {
    
    if (confirm('Are you sure you want to delete this video?')) {
      
      try {

        console.log('Attempting to delete video with id:', id);

        const req = await axios.delete(`/api/admin/video?id=${id}`);

        if(req.status === 200) {
          console.log('Video deleted successfully:', req.data);
          // Refresh the video list
          fetchVideos();
        }
      } catch (error) {
        console.error('Error deleting video:', error);
        if(error instanceof AxiosError) {
          console.error('Axios error details:', error.response);
        }
      }
      console.log('Deleting video:', id);
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
          <h2 className="text-2xl font-bold text-white">Video Projects</h2>
          <p className="text-gray-400">Manage your video portfolio</p>
        </div>
        <motion.button
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </motion.button>
      </div>

      {/* Add Video Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 border border-lime-500/20 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-lime-400 mb-4">Add New Video</h3>
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Video Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 1:45)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
                <label className="block text-sm font-medium text-lime-400">Tags</label>
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
                    placeholder="Add a tag..."
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
                <p className="text-gray-400 text-xs">Press Enter or click Add to include tags</p>
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
                  type="number"
                  placeholder="Views Count"
                  value={formData.views}
                  onChange={(e) => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                />
                <input
                  type="number"
                  placeholder="Likes Count"
                  value={formData.likes}
                  onChange={(e) => setFormData({ ...formData, likes: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 bg-gray-700/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Video
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

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-lime-500/20 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-700">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-lime-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.category}
                  </span>
                </div>
                {/* <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Play className="w-3 h-3" />
                    {video.duration}
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Eye className="w-3 h-3" />
                    {video.views}
                  </div>
                </div> */}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{video.client}</p>
                
                {/* Tags Display */}
                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {video.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block bg-lime-500/10 text-lime-400 px-2 py-1 rounded text-xs border border-lime-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {video.tags.length > 3 && (
                      <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                        +{video.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    {/* <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button> */}
                  </div>
                  <motion.button
                    onClick={() => handleDeleteVideo(video._id)}
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

      {videos.length === 0 && (
        <div className="text-center py-12">
          <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No videos found. Add your first video project!</p>
        </div>
      )}
    </div>
  );
};

export default VideosTab;