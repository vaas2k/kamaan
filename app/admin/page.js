// app/admin/dashboard/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LogOut, Video, Globe, Cuboid, BookOpen, 
  Plus, Trash2, Eye, CheckCircle, XCircle,
  Sparkles, Users, BarChart3, Settings
} from 'lucide-react';

// Import components we'll create next
import VideosTab from './components/VideosTab';
import WebsitesTab from './components/WebsitesTab';
import ModelsTab from './components/ModelsTab';
import BlogsTab from './components/BlogsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const authenticated = localStorage.getItem('adminAuthenticated');
      
      if (!token || authenticated !== 'true') {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  const tabs = [
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'websites', label: 'Websites', icon: Globe },
    { id: 'models', label: '3D Models', icon: Cuboid },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center ">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lime-400 text-lg">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-[80px]">
      {/* Animated Background */}
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
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-sm border-b border-lime-500/20 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-lime-500/10 border border-lime-500/20 rounded-2xl flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-lime-400" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
              <p className="text-lime-400 text-sm">Manage your portfolio and content</p>
            </div>
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/20 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Stats Overview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Videos', value: '25', icon: Video, color: 'lime' },
            { label: 'Web Projects', value: '18', icon: Globe, color: 'blue' },
            { label: '3D Models', value: '32', icon: Cuboid, color: 'purple' },
            { label: 'Blog Posts', value: '45', icon: BookOpen, color: 'orange' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-2xl p-6 hover:border-lime-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-500/10 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-lime-500/20 border-lime-500 text-lime-400 shadow-lg shadow-lime-500/25'
                    : 'bg-gray-900/50 border-lime-500/20 text-gray-400 hover:border-lime-500/50 hover:text-lime-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-6"
        >
          {activeTab === 'videos' && <VideosTab />}
          {activeTab === 'websites' && <WebsitesTab />}
          {activeTab === 'models' && <ModelsTab />}
          {activeTab === 'blogs' && <BlogsTab />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;