'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  FileText,
  User,
  Calendar,
  Clock
} from 'lucide-react';

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/blogs/unverified');
      setBlogs(res.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogAction = async (blogId, action) => {
    try {
      await axios.patch(`/api/blogs/${blogId}`, { action });
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error(`Error ${action} blog:`, error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.hero?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.hero?.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'verified' && blog.verified) ||
                         (filterStatus === 'unverified' && !blog.verified);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lime-400">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-4">
            Blog Management
          </h1>
          <p className="text-lime-400">
            Manage and approve blog posts
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="glass-morphism p-6 rounded-2xl border border-lime-500/20 text-center">
            <div className="text-2xl font-bold text-white mb-2">{blogs.length}</div>
            <div className="text-gray-400">Total Blogs</div>
          </div>
          <div className="glass-morphism p-6 rounded-2xl border border-lime-500/20 text-center">
            <div className="text-2xl font-bold text-white mb-2">
              {blogs.filter(blog => blog.verified).length}
            </div>
            <div className="text-gray-400">Verified</div>
          </div>
          <div className="glass-morphism p-6 rounded-2xl border border-lime-500/20 text-center">
            <div className="text-2xl font-bold text-white mb-2">
              {blogs.filter(blog => !blog.verified).length}
            </div>
            <div className="text-gray-400">Pending</div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-morphism p-4 rounded-2xl border border-lime-500/20 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title or subtitle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white focus:outline-none focus:border-lime-400 transition-colors"
            >
              <option value="all">All Blogs</option>
              <option value="verified">Verified</option>
              <option value="unverified">Pending</option>
            </select>
          </div>
        </motion.div>

        {/* Blog List */}
        <div className="space-y-6">
          {filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-morphism p-12 rounded-2xl border border-lime-500/20 text-center"
            >
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No blogs found</h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No blogs available'
                }
              </p>
            </motion.div>
          ) : (
            filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                index={index}
                onAction={handleBlogAction}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ blog, index, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-morphism p-6 rounded-2xl border border-lime-500/20 hover:border-lime-500/50 transition-all duration-300 group"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Featured Image */}
        {blog.hero?.featuredImage && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:w-64 lg:h-48 flex-shrink-0 rounded-xl overflow-hidden border border-lime-500/20"
          >
            <img
              src={blog.hero.featuredImage}
              alt="Featured"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-2">
                {blog.hero?.title}
              </h3>
              <p className="text-gray-400 mt-2 line-clamp-2">
                {blog.hero?.subtitle}
              </p>
            </div>

            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              blog.verified 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}>
              {blog.verified ? 'Verified' : 'Pending Review'}
            </div>
          </div>

          {/* Author and Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
            {blog.hero?.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.hero.author.name}</span>
                {blog.hero.author.title && (
                  <span className="text-gray-500">• {blog.hero.author.title}</span>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.metadata?.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.metadata?.readTime || 5} min read</span>
            </div>
          </div>

          {/* Content Preview */}
          <div className="space-y-3 mb-4">
            {blog.content?.slice(0, 2).map((block, blockIndex) => (
              <div key={blockIndex} className="text-gray-300">
                {block.type === 'paragraph' && (
                  <>
                    {block.data.heading && (
                      <h4 className="font-semibold text-lime-300 mb-1">
                        {block.data.heading}
                      </h4>
                    )}
                    <p className="text-sm leading-relaxed line-clamp-2">
                      {block.data.text}
                    </p>
                  </>
                )}
                {block.type === 'blockquote' && (
                  <blockquote className="border-l-2 border-lime-500 pl-3 italic text-gray-400 text-sm">
                    "{block.data.text}"
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-lime-500/20">
            <Link href={{ pathname: '/info', query: { blog: blog._id } }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors w-full sm:w-auto justify-center"
              >
                <Eye className="w-4 h-4" />
                View
              </motion.button>
            </Link>

            {!blog.verified && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAction(blog._id, 'verify')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors w-full sm:w-auto justify-center"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
                  onAction(blog._id, 'delete');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors w-full sm:w-auto justify-center"
            >
              <XCircle className="w-4 h-4" />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Glass morphism styles
const glassMorphismStyles = `
  .glass-morphism {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .glass-morphism:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(163, 230, 53, 0.3);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = glassMorphismStyles;
  document.head.appendChild(styleSheet);
}

export default BlogsTab;