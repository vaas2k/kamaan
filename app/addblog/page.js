'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Plus, Trash2, Image as ImageIcon, Quote, Type, Sparkles, ArrowRight } from 'lucide-react';

const AddBlog = () => {
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [authorImageFile, setAuthorImageFile] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (file) => {
    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      return base64Data;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAuthorImageFile(file);
      setAuthorImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImageFile(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    }
  };

  const addContentBlock = (type) => {
    const newBlock = {
      type,
      data: {
        ...(type === 'paragraph' && { heading: '', text: '' }),
        ...(type === 'image' && { file: null, preview: '', caption: '' }),
        ...(type === 'blockquote' && { text: '' })
      }
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (index, field, value) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index].data[field] = value;
    setContentBlocks(updatedBlocks);
  };

  const handleContentImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedBlocks = [...contentBlocks];
      updatedBlocks[index].data.file = file;
      updatedBlocks[index].data.preview = URL.createObjectURL(file);
      setContentBlocks(updatedBlocks);
    }
  };

  const removeContentBlock = (index) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!heroTitle || !heroSubtitle || !authorName || !authorTitle || !authorImageFile ||
      !featuredImageFile || !publishDate || !readTime || contentBlocks.length === 0) {
      alert('Please fill in all the fields and add at least one content block.');
      setLoading(false);
      return;
    }

    try {
      const authorImageUrl = await handleImageUpload(authorImageFile);
      if (!authorImageUrl) throw new Error('Failed to upload author image');

      const featuredImageUrl = await handleImageUpload(featuredImageFile);
      if (!featuredImageUrl) throw new Error('Failed to upload featured image');

      const updatedContentBlocks = await Promise.all(
        contentBlocks.map(async (block) => {
          if (block.type === 'image' && block.data.file) {
            const imageUrl = await handleImageUpload(block.data.file);
            return {
              ...block,
              data: {
                url: imageUrl,
                caption: block.data.caption
              }
            };
          }
          return block;
        })
      );

      const blogData = {
        hero: {
          title: heroTitle,
          subtitle: heroSubtitle,
          author: {
            name: authorName,
            title: authorTitle,
            image: authorImageUrl
          },
          featuredImage: featuredImageUrl
        },
        metadata: {
          date: publishDate,
          readTime
        },
        content: updatedContentBlocks
      };

      const req = await axios.post('/api/blogs/addblog', blogData);
      if (req.status === 200) {
        alert('Successfully added blog');
        // Reset form
        setHeroTitle('');
        setHeroSubtitle('');
        setAuthorName('');
        setAuthorTitle('');
        setAuthorImageFile(null);
        setAuthorImagePreview('');
        setFeaturedImageFile(null);
        setFeaturedImagePreview('');
        setPublishDate('');
        setReadTime('');
        setContentBlocks([]);
      } else {
        throw new Error('Failed to add blog');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add blog: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

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
      <section className="relative min-h-[40vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
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
                CREATE BLOG POST
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
            >
              WRITE
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
                BLOG
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Share your knowledge and insights with our community through engaging blog posts
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Form Content */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-8 hover:border-lime-500/50 transition-all duration-500"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl font-bold text-lime-400 mb-6 pb-4 border-b border-lime-500/20">Hero Section</h2>
              <div className="space-y-6">
                <InputField label="Title" value={heroTitle} onChange={setHeroTitle} theme="lime" />
                <InputField label="Subtitle" value={heroSubtitle} onChange={setHeroSubtitle} textarea theme="lime" />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-lime-400">Featured Image</label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-lime-500/30 rounded-2xl p-6 text-center cursor-pointer hover:border-lime-500/50 transition-all duration-300"
                    onClick={() => document.getElementById('featured-image').click()}
                  >
                    <input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageChange}
                      className="hidden"
                    />
                    <ImageIcon className="w-12 h-12 text-lime-400 mx-auto mb-3" />
                    <p className="text-gray-300">Click to upload featured image</p>
                    <p className="text-gray-400 text-sm mt-1">Recommended: 1200x600px</p>
                  </motion.div>
                  {featuredImagePreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4"
                    >
                      <img
                        src={featuredImagePreview}
                        alt="Featured preview"
                        className="h-48 w-full object-cover rounded-xl shadow-lg"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Author Information */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-8 hover:border-lime-500/50 transition-all duration-500"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl font-bold text-lime-400 mb-6 pb-4 border-b border-lime-500/20">Author Information</h2>
              <div className="space-y-6">
                <InputField label="Author Name" value={authorName} onChange={setAuthorName} theme="lime" />
                <InputField label="Author Title" value={authorTitle} onChange={setAuthorTitle} theme="lime" />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-lime-400">Author Image</label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-lime-500/30 rounded-2xl p-6 text-center cursor-pointer hover:border-lime-500/50 transition-all duration-300"
                    onClick={() => document.getElementById('author-image').click()}
                  >
                    <input
                      id="author-image"
                      type="file"
                      accept="image/*"
                      onChange={handleAuthorImageChange}
                      className="hidden"
                    />
                    <ImageIcon className="w-12 h-12 text-lime-400 mx-auto mb-3" />
                    <p className="text-gray-300">Click to upload author image</p>
                    <p className="text-gray-400 text-sm mt-1">Recommended: 400x400px</p>
                  </motion.div>
                  {authorImagePreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 flex justify-center"
                    >
                      <img
                        src={authorImagePreview}
                        alt="Author preview"
                        className="h-32 w-32 object-cover rounded-full shadow-lg border-2 border-lime-500/50"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Metadata */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-8 hover:border-lime-500/50 transition-all duration-500"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl font-bold text-lime-400 mb-6 pb-4 border-b border-lime-500/20">Metadata</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Publish Date" type="date" value={publishDate} onChange={setPublishDate} theme="lime" />
                <InputField label="Read Time (minutes)" type="number" value={readTime} onChange={setReadTime} theme="lime" />
              </div>
            </motion.div>

            {/* Content Blocks */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-8 hover:border-lime-500/50 transition-all duration-500"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-2xl font-bold text-lime-400 mb-6 pb-4 border-b border-lime-500/20">Content Blocks</h2>
              
              {/* Add Block Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  type="button"
                  onClick={() => addContentBlock('paragraph')}
                  className="flex items-center gap-2 bg-lime-500/10 border border-lime-500/30 text-lime-400 px-6 py-3 rounded-xl hover:bg-lime-500/20 hover:border-lime-400/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Type className="w-4 h-4" />
                  Add Paragraph
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => addContentBlock('image')}
                  className="flex items-center gap-2 bg-lime-500/10 border border-lime-500/30 text-lime-400 px-6 py-3 rounded-xl hover:bg-lime-500/20 hover:border-lime-400/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ImageIcon className="w-4 h-4" />
                  Add Image
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => addContentBlock('blockquote')}
                  className="flex items-center gap-2 bg-lime-500/10 border border-lime-500/30 text-lime-400 px-6 py-3 rounded-xl hover:bg-lime-500/20 hover:border-lime-400/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Quote className="w-4 h-4" />
                  Add Quote
                </motion.button>
              </div>

              {/* Content Blocks List */}
              <div className="space-y-6">
                <AnimatePresence>
                  {contentBlocks.map((block, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 border border-lime-500/20 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-lime-400 capitalize">
                          {block.type} Block
                        </h3>
                        <motion.button
                          type="button"
                          onClick={() => removeContentBlock(index)}
                          className="text-red-400 hover:text-red-300 cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {block.type === 'paragraph' && (
                        <div className="space-y-4">
                          <InputField
                            label="Heading"
                            value={block.data.heading}
                            onChange={(value) => updateContentBlock(index, 'heading', value)}
                            theme="lime"
                          />
                          <InputField
                            label="Paragraph Text"
                            value={block.data.text}
                            onChange={(value) => updateContentBlock(index, 'text', value)}
                            textarea
                            theme="lime"
                          />
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-lime-400">Image</label>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="border-2 border-dashed border-lime-500/30 rounded-xl p-4 text-center cursor-pointer hover:border-lime-500/50 transition-all duration-300"
                              onClick={() => document.getElementById(`content-image-${index}`).click()}
                            >
                              <input
                                id={`content-image-${index}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleContentImageChange(index, e)}
                                className="hidden"
                              />
                              <ImageIcon className="w-8 h-8 text-lime-400 mx-auto mb-2" />
                              <p className="text-gray-300 text-sm">Click to upload image</p>
                            </motion.div>
                            {block.data.preview && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2"
                              >
                                <img
                                  src={block.data.preview}
                                  alt="Content preview"
                                  className="h-32 object-cover rounded-lg"
                                />
                              </motion.div>
                            )}
                          </div>
                          <InputField
                            label="Caption"
                            value={block.data.caption}
                            onChange={(value) => updateContentBlock(index, 'caption', value)}
                            theme="lime"
                          />
                        </div>
                      )}

                      {block.type === 'blockquote' && (
                        <InputField
                          label="Quote Text"
                          value={block.data.text}
                          onChange={(value) => updateContentBlock(index, 'text', value)}
                          textarea
                          theme="lime"
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-lime-500 hover:bg-lime-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 cursor-pointer flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Publishing Blog...
                </>
              ) : (
                <>
                  <span>Publish Blog Post</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = 'text', textarea = false, theme = "lime" }) => {
  const colorClass = {
    lime: "border-lime-500/20 focus:border-lime-500 focus:ring-lime-500/50 text-lime-400"
  }[theme];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-lime-400">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 bg-gray-800/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-500 text-white ${colorClass}`}
          rows="4"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 bg-gray-800/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-500 text-white ${colorClass}`}
        />
      )}
    </div>
  );
};

const Page = () => {
  return <AddBlog />;
};

export default Page;