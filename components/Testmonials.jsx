"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Umair Ali",
      position: "Freight Dispatch Company Owner",
      company: "FDC Inc.",
      content: "Working with Kamaan was a game-changer for our business. Their attention to detail and innovative solutions helped us increase our online revenue by 300% in just 6 months.",
      rating: 5,
      image: "/testo/umair.jpg"
    },
    {
      id: 2,
      name: "Ficket",
      position: "Youtuber",
      company: "Youtube",
      content: "The digital marketing strategy they developed for us was exceptional. Our brand visibility increased dramatically and we're seeing consistent growth month over month.",
      rating: 5,
      image: "/testo/ficket.jpg"
    },
    {
      id: 3,
      name: "Lisa Jackson",
      position: "Graphic Designer",
      company: "Creative Studio",
      content: "From web development to branding, Kamaan delivered beyond our expectations. Their team is professional, creative, and truly understands modern digital needs.",
      rating: 5,
      image: "/testo/lisa.jpg"
    },
    {
      id: 4,
      name: "Omer Hisham",
      position: "Agency Owner",
      company: "InnovateLabs",
      content: "The mobile app they built for us has received incredible feedback from our users. The performance and user experience are outstanding.",
      rating: 5,
      image: "/testo/omer.jpg"
    },
    {
      id: 5,
      name: "Ismael Tashfeen",
      position: "UI/UX Designer",
      company: "DesignHub",
      content: "The mobile app they built for us has received incredible feedback from our users. The performance and user experience are outstanding.",
      rating: 5,
      image: "/testo/ismael.jpg"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "200+", label: "Happy Clients" },
    { number: "98%", label: "Retention Rate" },
    { number: "24/7", label: "Support" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Variants for sliding animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

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

        {/* Testimonials Carousel */}
        <div className="relative mb-16">
          {/* Carousel Container */}
          <div 
            className="relative h-[400px] overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full group">
                  
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-lime-400/50" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-lime-400 text-lime-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <motion.img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-lime-500/30 group-hover:border-lime-400 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h4 className="text-white font-bold text-xl group-hover:text-lime-300 transition-colors duration-300">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-400 text-sm">{testimonials[currentIndex].position}</p>
                      <p className="text-lime-400/80 text-sm font-medium">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-lime-400 to-lime-600 mt-6 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(163, 230, 53, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="p-4 border border-lime-500/30 text-lime-400 rounded-2xl hover:border-lime-400 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </motion.button>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-lime-400 scale-125" 
                      : "bg-gray-600 hover:bg-lime-400/50"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(163, 230, 53, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="p-4 border border-lime-500/30 text-lime-400 rounded-2xl hover:border-lime-400 transition-all duration-300"
            >
              <ArrowRight size={24} />
            </motion.button>
          </div>

          {/* Testimonial Counter */}
          <div className="text-center mt-4">
            <span className="text-lime-400 text-sm font-medium">
              {currentIndex + 1} / {testimonials.length}
            </span>
          </div>
        </div>

        {/* Additional Testimonials Grid (Static) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            More <span className="text-lime-400">Happy Clients</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-lime-500/30 transition-all duration-300 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-lime-400 text-lime-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-lime-500/30"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <Link href={'/contacts'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-lime-500/25"
              >
              Start Your Project
            </motion.button>
              </Link>
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;