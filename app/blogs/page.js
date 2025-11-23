'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Tag, BookOpen, MapPin, PenTool, Sparkles, Eye, Clock, Search } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '../../components/Loading';

const COLORS = [
    '#a3e635', // lime-400
    '#84cc16', // lime-500
    '#65a30d', // lime-600
    '#4d7c0f', // lime-700
    '#3f6212', // lime-800
    '#365314'  // lime-900
];

const Page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAuthor, setSelectedAuthor] = useState('All');

    const fetchBlogs = async (initialLoad = false) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/blogs/dynamicblogs', {
                blogsToReturn: 3,
                page: page
            });

            if (data.success) {
                if (initialLoad) {
                    setBlogs(data.blog);
                } else {
                    setBlogs(prev => [...prev, ...data.blog]);
                }
                setPage(prev => prev + 1);
                setHasMore(data.blog.length === 3);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(true);
    }, []);

    const handleLoadMore = async () => {
        if (hasMore) {
            await fetchBlogs();
        }
    };

    // Get unique categories and authors for filters
    const categories = [...new Set(blogs.map(blog => blog.metadata.category || 'General'))];
    const authors = [...new Set(blogs.map(blog => blog.hero.author.name))];

    // Filter blogs based on search and filters
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.hero.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.find(c => c.type === 'paragraph')?.data.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.metadata.category === selectedCategory;
        const matchesAuthor = selectedAuthor === 'All' || blog.hero.author.name === selectedAuthor;

        return matchesSearch && matchesCategory && matchesAuthor;
    });

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
            <section className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
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
                                LATEST INSIGHTS
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
                        >
                            BLOG
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
                                POSTS
                            </motion.span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                        >
                            Discover insightful articles and updates about{" "}
                            <span className="text-lime-400 font-semibold">digital trends, design, and technology</span>
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            variants={itemVariants}
                            className="max-w-2xl mx-auto relative"
                        >
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lime-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                className="w-full pl-12 pr-6 py-4 rounded-2xl shadow-2xl bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                <div className="bg-gradient-to-r from-lime-500/10 to-lime-600/10 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-8 text-center">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-left">
                            <h2 className="text-2xl font-bold text-white mb-3">Have a Story to Share?</h2>
                            <p className="text-lg text-gray-300">
                                Contribute to our community by publishing your own blog post. Share your knowledge, experiences,
                                and insights with thousands of readers.
                            </p>
                        </div>
                        <Link href="/addblog" className="w-full md:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 w-full justify-center"
                            >
                                <PenTool size={20} />
                                <span>Publish Your Blog</span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
            >
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-lime-400" />
                        <select
                            className="px-4 py-2 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 text-white focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 transition-all duration-300"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-lime-400" />
                        <select
                            className="px-4 py-2 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-lime-500/20 text-white focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 transition-all duration-300"
                            value={selectedAuthor}
                            onChange={(e) => setSelectedAuthor(e.target.value)}
                        >
                            <option value="All">All Authors</option>
                            {authors.map(author => (
                                <option key={author} value={author}>{author}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {loading && blogs.length === 0 ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>

                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredBlogs.length > 0 ? (
                                    filteredBlogs.map((blog, index) => {
                                        const colorIndex = index % COLORS.length;
                                        const borderColor = COLORS[colorIndex];
                                        const firstParagraph = blog.content.find(c => c.type === 'paragraph')?.data.text || '';

                                        return (
                                            <Link
                                                href={{
                                                    pathname: '/info',
                                                    query: { blog: blog._id },
                                                }}
                                                key={`${blog._id}-${index}`}
                                            >
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="group cursor-pointer h-full"
                                                >
                                                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full flex flex-col">
                                                        {/* Image Section */}
                                                        <div className="relative overflow-hidden h-48">
                                                            <Image
                                                                src={blog.hero.featuredImage}
                                                                alt={blog.hero.title}
                                                                fill
                                                                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                                priority={index < 6}
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                            {/* Category Badge */}
                                                            <div className="absolute top-4 left-4 bg-lime-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                                                                <span className="text-white text-sm font-medium">
                                                                    {blog.metadata.category || 'General'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Content Section */}
                                                        <div className="p-6 flex-1 flex flex-col">
                                                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-300 line-clamp-2">
                                                                {blog.hero.title}
                                                            </h2>

                                                            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-4">
                                                                <div className="flex items-center">
                                                                    <Calendar size={16} className="mr-2 text-lime-400" />
                                                                    {new Date(blog.metadata.date).toLocaleDateString('en-US', {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                        year: 'numeric'
                                                                    })}
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <User size={16} className="mr-2 text-lime-400" />
                                                                    {blog.hero.author.name}
                                                                </div>
                                                            </div>

                                                            <p className="text-gray-300 line-clamp-3 text-base mb-4 flex-1">
                                                                {firstParagraph}
                                                            </p>

                                                            {/* Read More Button */}
                                                            <motion.div
                                                                whileHover={{ x: 5 }}
                                                                className="flex items-center text-lime-400 font-semibold mt-auto group/readmore"
                                                            >
                                                                <span>Read More</span>
                                                                <ArrowRight className="w-4 h-4 ml-2 transform group-hover/readmore:translate-x-1 transition-transform duration-300" />
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="col-span-3 text-center py-16"
                                    >
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-12">
                                            <h3 className="text-2xl font-bold text-white mb-4">No blog posts found</h3>
                                            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-all duration-300"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setSelectedCategory('All');
                                                    setSelectedAuthor('All');
                                                }}
                                            >
                                                Reset Filters
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Load More Button */}
                    {(hasMore && searchTerm === '' && selectedCategory === 'All' && selectedAuthor === 'All') && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex justify-center mt-16"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Loading More Posts...
                                    </>
                                ) : (
                                    <>
                                        <span>Load More Posts</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    )}

                    {!hasMore && blogs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mt-12 text-gray-400"
                        >
                            You've reached the end of available posts
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Page;