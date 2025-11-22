"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check, Play, Code, Video, Palette, Cuboid, ArrowRight,
    Star, Users, Clock, Award, Zap, Sparkles, ArrowUpRight,
    Eye, Github, ExternalLink, Phone, Quote
} from "lucide-react";

const ServicesPage = () => {
    const [activeService, setActiveService] = useState(0);

    const services = [
        {
            icon: Video,
            title: "VIDEO EDITING & GFX/VFX",
            description: "Professional video editing, motion graphics, and visual effects that bring your stories to life with stunning visual appeal.",
            features: ["4K Video Editing", "Motion Graphics", "Visual Effects", "Color Grading", "Audio Mixing"],
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&auto=format&fit=crop&q=60",
            gradient: "from-purple-500/20 to-lime-500/20",
            projects: [
                { name: "Brand Commercial", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&auto=format&fit=crop&q=60" },
                { name: "Music Video", image: "https://images.unsplash.com/photo-1574717024453-9f6a7b5a8337?w=300&auto=format&fit=crop&q=60" }
            ]
        },
        {
            icon: Code,
            title: "WEBSITE DESIGN & DEVELOPMENT",
            description: "Modern, responsive websites and web applications built with cutting-edge technologies for optimal performance.",
            features: ["Responsive Design", "E-Commerce", "CMS Integration", "SEO Optimization", "Web Applications"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
            gradient: "from-blue-500/20 to-lime-500/20",
            projects: [
                { name: "E-Commerce Platform", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&auto=format&fit=crop&q=60" },
                { name: "Corporate Website", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&auto=format&fit=crop&q=60" }
            ]
        },
        {
            icon: Cuboid,
            title: "3D MODELING & ANIMATION",
            description: "Create immersive 3D experiences with detailed modeling, texturing, and realistic animations for various applications.",
            features: ["3D Modeling", "Texturing", "Animation", "Rendering", "AR/VR Integration"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=60",
            gradient: "from-orange-500/20 to-lime-500/20",
            projects: [
                { name: "Product Visualization", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&auto=format&fit=crop&q=60" },
                { name: "Architectural Render", image: "https://images.unsplash.com/photo-1548611633-15cde58d01c9?w=300&auto=format&fit=crop&q=60" }
            ]
        },
        {
            icon: Palette,
            title: "GRAPHIC DESIGN & BRANDING",
            description: "Complete branding solutions including logo design, marketing materials, and visual identity development.",
            features: ["Logo Design", "Brand Identity", "Print Materials", "Social Media Graphics", "UI/UX Design"],
            image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&auto=format&fit=crop&q=60",
            gradient: "from-pink-500/20 to-lime-500/20",
            projects: [
                { name: "Brand Identity", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=300&auto=format&fit=crop&q=60" },
                { name: "Marketing Kit", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&auto=format&fit=crop&q=60" }
            ]
        }
    ];

    const stats = [
        { number: "150+", label: "Projects Completed", icon: Zap },
        { number: "98%", label: "Client Satisfaction", icon: Star },
        { number: "50+", label: "Happy Clients", icon: Users },
        { number: "24/7", label: "Support", icon: Clock }
    ];

    const whyChooseUs = [
        {
            title: "QUALITY SERVICES",
            description: "We deliver premium quality services that exceed client expectations and industry standards.",
            icon: Award
        },
        {
            title: "PROFESSIONAL TEAM",
            description: "Our team consists of experienced professionals dedicated to delivering exceptional results.",
            icon: Users
        },
        {
            title: "TRUSTED BY CLIENTS",
            description: "Join hundreds of satisfied clients who trust us with their digital transformation journey.",
            icon: Star
        },
        {
            title: "INNOVATIVE SOLUTIONS",
            description: "We leverage cutting-edge technology and creative approaches to solve complex problems.",
            icon: Zap
        }
    ];

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
                                PREMIUM DIGITAL SERVICES
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
                        >
                            OUR
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
                                SERVICES
                            </motion.span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                        >
                            We transform ideas into <span className="text-lime-400 font-semibold">digital masterpieces</span> through cutting-edge technology and creative innovation
                        </motion.p>

                        {/* Animated Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                        >
                            {stats.map((stat, index) => (
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

            {/* Interactive Services Showcase */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                            WHAT WE{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
                                CREATE
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Explore our comprehensive suite of digital services designed to elevate your brand
                        </p>
                    </motion.div>

                    {/* Services Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {services.map((service, index) => (
                            <motion.button
                                key={service.title}
                                onClick={() => setActiveService(index)}
                                className={`px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-500 ${activeService === index
                                    ? "bg-lime-500/20 border-lime-500 text-lime-400 shadow-2xl shadow-lime-500/25"
                                    : "bg-gray-900/50 border-gray-600 text-gray-400 hover:border-lime-500/50 hover:text-lime-300"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center gap-2 font-medium">
                                    <service.icon className="w-4 h-4" />
                                    {service.title.split(" ")[0]}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Active Service Display */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Service Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-lime-500/10 border border-lime-500/20 rounded-2xl flex items-center justify-center">
                                        {/* {services[activeService].icon} */}
                                    </div>
                                    <h3 className="text-4xl font-bold text-white">
                                        {services[activeService].title}
                                    </h3>
                                </div>

                                <p className="text-xl text-gray-300 leading-relaxed">
                                    {services[activeService].description}
                                </p>

                                <ul className="space-y-4">
                                    {services[activeService].features.map((feature, index) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="flex items-center gap-4 text-lg text-gray-300"
                                        >
                                            <div className="w-8 h-8 bg-lime-500/10 rounded-full flex items-center justify-center">
                                                <Check className="w-4 h-4 text-lime-400" />
                                            </div>
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 flex items-center gap-3"
                                >
                                    <span>Start Project</span>
                                    <ArrowUpRight className="w-5 h-5" />
                                </motion.button>
                            </motion.div>

                            {/* Service Visual */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative"
                            >
                                <div className={`bg-gradient-to-br ${services[activeService].gradient} rounded-3xl p-8 backdrop-blur-sm`}>
                                    <motion.img
                                        src={services[activeService].image}
                                        alt={services[activeService].title}
                                        className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Floating Project Cards */}
                                    <div className="absolute -bottom-6 -right-6">
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-2xl"
                                        >
                                            <img
                                                src={services[activeService].projects[0].image}
                                                alt={services[activeService].projects[0].name}
                                                className="w-24 h-24 object-cover rounded-xl mb-2"
                                            />
                                            <div className="text-white text-sm font-medium">
                                                {services[activeService].projects[0].name}
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="absolute -top-6 -left-6">
                                        <motion.div
                                            animate={{ y: [0, 10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-2xl"
                                        >
                                            <img
                                                src={services[activeService].projects[1].image}
                                                alt={services[activeService].projects[1].name}
                                                className="w-24 h-24 object-cover rounded-xl mb-2"
                                            />
                                            <div className="text-white text-sm font-medium">
                                                {services[activeService].projects[1].name}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
            {/* Why Choose Us Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6"
                        >
                            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                            <span className="text-lime-300 text-sm font-medium tracking-wide">
                                SEE WHY YOU SHOULD CHOOSE
                            </span>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                            PISCLE{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
                                AGENCY
                            </span>
                        </h2>
                    </motion.div>

                    {/* Why Choose Us Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full relative overflow-hidden">
                                    {/* Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-lime-500/10 border border-lime-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-500/20 group-hover:border-lime-400/50 transition-all duration-300">
                                            <item.icon className="w-8 h-8 text-lime-400" />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-lime-300 transition-colors duration-300">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Hover Effect Line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-lime-400 to-lime-600 group-hover:w-full transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left Side - Ready to Hire */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Hire us
                            </h3>
                            <p className="text-xl text-gray-300 mb-8">
                                Let's create something amazing together. Get started with our professional services today.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 flex items-center gap-3 mx-auto lg:mx-0"
                            >
                                <Quote className="w-5 h-5" />
                                GET A FREE QUOTE FOR YOUR SITE
                            </motion.button>
                        </motion.div>

                        {/* Right Side - Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-lime-500/10 to-lime-600/10 backdrop-blur-sm border border-lime-500/20 rounded-3xl p-8 text-center"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/20 border border-lime-500/30 mb-6">
                                <Phone className="w-4 h-4 text-lime-400" />
                                <span className="text-lime-300 text-sm font-medium">FOR CONSULTATION</span>
                            </div>

                            <motion.div
                                className="text-2xl md:text-3xl font-bold text-white mb-4"
                                animate={{
                                    textShadow: [
                                        "0 0 20px rgba(163, 230, 53, 0.3)",
                                        "0 0 40px rgba(163, 230, 53, 0.6)",
                                        "0 0 20px rgba(163, 230, 53, 0.3)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                +82 (8800) - 8850
                            </motion.div>

                            <p className="text-gray-400 text-sm">
                                Available 24/7 for your projects and inquiries
                            </p>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-3 -right-3 w-6 h-6 bg-lime-400/20 rounded-full blur-sm"
                            />
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                className="absolute -bottom-2 -left-2 w-4 h-4 bg-lime-500/30 rounded-full blur-sm"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>



            {/* Final CTA Section */}
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
                            className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-purple-500/10 rounded-3xl blur-3xl"
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
                                READY TO <span className="text-lime-400">CREATE</span>?
                            </motion.h2>

                            <motion.p
                                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Let's transform your vision into reality with our expert digital services
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-6 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-lime-500/25 flex items-center gap-3 text-lg"
                                >
                                    <Zap className="w-6 h-6" />
                                    Start Your Project
                                    <ArrowUpRight className="w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;