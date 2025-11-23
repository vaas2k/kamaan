'use client'
import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from '../../components/Loading';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <BlogContent />
        </Suspense>
    );
}

const BlogContent = () => {
    const searchParams = useSearchParams();
    const blogId = searchParams.get('blog');
    const [blogData, setBlogData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        (async function getBlog() {
            try {
                const req = await axios.post('/api/blogs/oneblog', { blogID: blogId });
                if (req.status === 200) {
                    setBlogData(req.data.blog[0]);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [blogId]);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!blogData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-morphism p-8 rounded-2xl text-center border border-lime-500/30 max-w-md w-full"
                >
                    <div className="text-6xl mb-4">📄</div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent mb-2">
                        Blog Not Found
                    </h1>
                    <p className="text-gray-300">The blog post you're looking for doesn't exist or has been moved.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Gradient Orbs */}
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl"
                    />
                </div>

                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={blogData.hero.featuredImage}
                        alt="Featured Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl"
                    >
                        {/* Category Badge */}
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-2 mb-6 glass-morphism rounded-full border border-lime-500/30 text-lime-300 text-sm font-medium"
                        >
                            {blogData.metadata.category || "Digital Insights"}
                        </motion.span>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 bg-clip-text text-transparent">
                                {blogData.hero.title}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            {blogData.hero.subtitle}
                        </motion.p>

                        {/* Author Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center justify-center gap-4 glass-morphism p-4 rounded-2xl border border-lime-500/20 max-w-xs mx-auto"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-12 h-12 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 p-0.5"
                            >
                                <img
                                    src={blogData.hero.author.image}
                                    alt={blogData.hero.author.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </motion.div>
                            <div className="text-left">
                                <p className="font-semibold text-lime-300">{blogData.hero.author.name}</p>
                                <p className="text-sm text-lime-200/70">{blogData.hero.author.title}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-lime-400 text-sm mb-2">Scroll</span>
                        <div className="w-6 h-10 border-2 border-lime-400 rounded-full flex justify-center">
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-1 h-3 bg-lime-400 rounded-full mt-2"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-16">
                {/* Metadata */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="glass-morphism p-6 rounded-2xl mb-12 border border-lime-500/20"
                >
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-lime-500/10 rounded-full text-lime-300 text-sm font-medium flex items-center gap-2"
                            >
                                <span>📅</span>
                                {new Date(blogData.metadata.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </motion.span>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-lime-500/10 rounded-full text-lime-300 text-sm font-medium flex items-center gap-2"
                            >
                                <span>⏱️</span>
                                {blogData.metadata.readTime} min read
                            </motion.span>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-gradient-to-r from-lime-500/20 to-lime-600/10 rounded-full text-lime-300 text-sm font-medium border border-lime-500/30"
                        >
                            {blogData.metadata.views || '1.2k'} views
                        </motion.div>
                    </div>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-16">
                    {blogData.content.map((block, index) => {
                        const animationDelay = index * 0.1;

                        switch (block.type) {
                            case 'paragraph':
                                return (
                                    <motion.section
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: animationDelay }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="glass-morphism p-8 rounded-2xl border border-lime-500/20 hover:border-lime-400/40 transition-all duration-500 group"
                                    >
                                        {block.data.heading && (
                                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-lime-300 to-lime-400 bg-clip-text text-transparent group-hover:from-lime-200 group-hover:to-lime-300 transition-all duration-300">
                                                {block.data.heading}
                                            </h2>
                                        )}
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            {block.data.text}
                                        </p>
                                    </motion.section>
                                );

                            case 'image':
                                return (
                                    <motion.figure
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: animationDelay }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <div className="rounded-2xl overflow-hidden border border-lime-500/30 shadow-2xl shadow-lime-500/10 group-hover:shadow-lime-400/20 transition-all duration-500">
                                            <motion.img
                                                whileHover={{ scale: 1.03 }}
                                                transition={{ duration: 0.5 }}
                                                src={block.data.url}
                                                alt={block.data.caption}
                                                className="w-full h-96 object-cover"
                                            />
                                        </div>
                                        {block.data.caption && (
                                            <figcaption className="mt-4 text-center">
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    className="text-lime-300/80 italic text-sm"
                                                >
                                                    {block.data.caption}
                                                </motion.p>
                                            </figcaption>
                                        )}
                                    </motion.figure>
                                );

                            case 'blockquote':
                                return (
                                    <motion.blockquote
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: animationDelay }}
                                        viewport={{ once: true }}
                                        className="relative my-16 p-8 rounded-2xl glass-morphism border-l-4 border-lime-400"
                                    >
                                        <div className="text-lime-400 text-6xl absolute -top-2 left-4 opacity-20">"</div>
                                        <p className="text-xl md:text-2xl text-lime-200 italic relative z-10 leading-relaxed">
                                            {block.data.text}
                                        </p>
                                        <div className="text-lime-400 text-6xl absolute -bottom-6 right-4 opacity-20">"</div>
                                    </motion.blockquote>
                                );

                            case 'code':
                                return (
                                    <motion.pre
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: animationDelay }}
                                        className="glass-morphism p-6 rounded-2xl border border-lime-500/20 overflow-x-auto"
                                    >
                                        <code className="text-lime-300 text-sm">
                                            {block.data.code}
                                        </code>
                                    </motion.pre>
                                );

                            default:
                                return null;
                        }
                    })}
                </div>

                {/* Tags */}
                {blogData.metadata.tags && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-16 glass-morphism p-6 rounded-2xl border border-lime-500/20"
                    >
                        <h3 className="text-lg font-semibold text-lime-300 mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {blogData.metadata.tags.map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 bg-lime-500/10 border border-lime-500/30 rounded-full text-lime-300 text-sm hover:bg-lime-500/20 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </main>

            {/* Floating Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 glass-morphism p-4 rounded-full border border-lime-400 text-lime-300 shadow-lg shadow-lime-500/20 backdrop-blur-sm"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button>
        </div>
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