'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Video,
    Cuboid,
    Globe,
    Send,
    Phone,
    Mail,
    MapPin,
    Clock,
    CheckCircle,
    Sparkles
} from 'lucide-react';
import axios, { AxiosError } from 'axios';

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsSubmitting(true);
            const response = await axios.post('/api/project', formData);

            if (response.status === 200) {
                console.log('Form submitted successfully:', response.data);
            }

            
        } catch (err) {
            console.error('Error submitting form:', err);
            if (err instanceof AxiosError) {
                alert(`Submission failed: ${err.response?.data?.message || err.message}`);
            }
        }
        finally {
            setIsSubmitting(false);
            setIsSubmitted(true);
            // Reset form after success
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    projectType: '',
                    budget: '',
                    timeline: '',
                    description: ''
                });
            }, 5000);
        }
    };

    const services = [
        {
            icon: Video,
            title: 'Video Editing',
            description: 'Professional video editing, motion graphics, and post-production services',
            features: ['4K Video Editing', 'Color Grading', 'Motion Graphics', 'Sound Design']
        },
        {
            icon: Cuboid,
            title: '3D Modeling & Animation',
            description: 'High-quality 3D models, animations, and visual effects',
            features: ['3D Modeling', 'Character Animation', 'Visual Effects', 'Product Visualization']
        },
        {
            icon: Globe,
            title: 'Website Development',
            description: 'Modern, responsive websites and web applications',
            features: ['React/Next.js', 'Responsive Design', 'E-commerce', 'Web Applications']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"
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

            {/* Header Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full border border-lime-500/30 text-lime-400 text-sm mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Start Your Project Today
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        Let&apos;s Create Something{' '}
                        <span className="bg-gradient-to-r from-lime-300 to-lime-500 bg-clip-text text-transparent">
                            Amazing
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Ready to bring your vision to life? Get in touch with our team of experts
                        in video editing, 3D animation, and web development.
                    </motion.p>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Our <span className="text-lime-400">Services</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Professional creative services tailored to your needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    whileHover={{ y: -5 }}
                                    className="glass-morphism p-8 rounded-2xl border border-lime-500/20 hover:border-lime-500/50 transition-all duration-300 group"
                                >
                                    <div className="w-16 h-16 bg-lime-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-500/20 transition-colors">
                                        <Icon className="w-8 h-8 text-lime-400" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-400">
                                                <div className="w-2 h-2 bg-lime-400 rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="glass-morphism p-8 rounded-2xl border border-lime-500/20"
                        >
                            <h2 className="text-3xl font-bold text-white mb-2">Get a Quote</h2>
                            <p className="text-gray-400 mb-8">
                                Tell us about your project and we&apos;ll get back to you within 24 hours.
                            </p>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle className="w-16 h-16 text-lime-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                                    <p className="text-gray-300">
                                        Your project details have been received. We&apos;ll contact you soon.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-lime-300 mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-lime-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-lime-300 mb-2">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-lime-300 mb-2">
                                                Project Type *
                                            </label>
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white focus:outline-none focus:border-lime-400 transition-colors"
                                            >
                                                <option value="">Select a service</option>
                                                <option value="video-editing">Video Editing</option>
                                                <option value="3d-modeling">3D Modeling & Animation</option>
                                                <option value="web-development">Website Development</option>
                                                <option value="multiple">Multiple Services</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-lime-300 mb-2">
                                                Budget Range *
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white focus:outline-none focus:border-lime-400 transition-colors"
                                            >
                                                <option value="">Select budget</option>
                                                <option value="1k-5k">$1,000 - $5,000</option>
                                                <option value="5k-15k">$5,000 - $15,000</option>
                                                <option value="15k-50k">$15,000 - $50,000</option>
                                                <option value="50k+">$50,000+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-lime-300 mb-2">
                                            Timeline
                                        </label>
                                        <select
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white focus:outline-none focus:border-lime-400 transition-colors"
                                        >
                                            <option value="">Select timeline</option>
                                            <option value="urgent">Urgent (1-2 weeks)</option>
                                            <option value="standard">Standard (3-4 weeks)</option>
                                            <option value="flexible">Flexible (1-2 months)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-lime-300 mb-2">
                                            Project Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-gray-800/50 border border-lime-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                                            placeholder="Describe your project in detail..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-lime-500 to-lime-600 text-white py-4 px-6 rounded-xl hover:from-lime-600 hover:to-lime-700 shadow-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Project Details
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Have a project in mind? Let&apos;s discuss how we can help bring your
                                    creative vision to life with our expert services.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 glass-morphism p-6 rounded-2xl border border-lime-500/20"
                                >
                                    <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-lime-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Phone</h3>
                                        <p className="text-gray-300">+1 (555) 123-4567</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 glass-morphism p-6 rounded-2xl border border-lime-500/20"
                                >
                                    <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-lime-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Email</h3>
                                        <p className="text-gray-300">hello@kamaandigital.com</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 glass-morphism p-6 rounded-2xl border border-lime-500/20"
                                >
                                    <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-lime-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Response Time</h3>
                                        <p className="text-gray-300">Within 24 hours</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 glass-morphism p-6 rounded-2xl border border-lime-500/20"
                                >
                                    <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-lime-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Based In</h3>
                                        <p className="text-gray-300">Global Remote Team</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Process Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-morphism p-6 rounded-2xl border border-lime-500/20"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">Our Process</h3>
                                <div className="space-y-3">
                                    {[
                                        '1. Consultation & Project Analysis',
                                        '2. Proposal & Timeline',
                                        '3. Development & Creation',
                                        '4. Review & Revisions',
                                        '5. Delivery & Support'
                                    ].map((step, index) => (
                                        <div key={index} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-2 h-2 bg-lime-400 rounded-full" />
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
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

export default Page;