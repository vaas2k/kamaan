"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechInnovate",
      company: "TechInnovate Inc.",
      content: "Working with Kamaan was a game-changer for our business. Their attention to detail and innovative solutions helped us increase our online revenue by 300% in just 6 months.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Global Solutions",
      content: "The digital marketing strategy they developed for us was exceptional. Our brand visibility increased dramatically and we're seeing consistent growth month over month.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder & CEO",
      company: "Creative Studio",
      content: "From web development to branding, Kamaan delivered beyond our expectations. Their team is professional, creative, and truly understands modern digital needs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Product Manager",
      company: "InnovateLabs",
      content: "The mobile app they built for us has received incredible feedback from our users. The performance and user experience are outstanding.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "200+", label: "Happy Clients" },
    { number: "98%", label: "Retention Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6"
          >
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-lime-300 text-sm font-medium tracking-wide">
              CLIENT TESTIMONIALS
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            WHAT OUR{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
              CLIENTS SAY
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center hover:border-lime-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10"
            >
              <div className="text-2xl md:text-3xl font-bold text-lime-400 mb-2">{stat.number}</div>
              <div className="text-gray-400 font-medium text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full">
                
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-lime-400/50" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-lime-400 text-lime-400"
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  "{testimonial.content}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-lime-500/30 group-hover:border-lime-400 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg group-hover:text-lime-300 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                    <p className="text-lime-400/80 text-sm font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-lime-400 to-lime-600 mt-6 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-lime-500/10 to-lime-600/10 backdrop-blur-sm border border-lime-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-20 h-20 border border-lime-400 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-lime-400 rounded-full"></div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            READY TO JOIN OUR SATISFIED CLIENTS?
          </h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10"
          >
            Let's work together to create something amazing. Your success story could be next!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-lime-500/25"
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-lime-500 text-lime-400 hover:bg-lime-500/10 font-bold rounded-lg transition-all duration-300"
            >
              View Case Studies
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(163, 230, 53, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="p-4 border border-lime-500/30 text-lime-400 rounded-2xl hover:border-lime-400 transition-all duration-300"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(163, 230, 53, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="p-4 border border-lime-500/30 text-lime-400 rounded-2xl hover:border-lime-400 transition-all duration-300"
          >
            <ArrowRight size={24} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;