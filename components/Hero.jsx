"use client";
import { motion } from "motion/react";
import React from "react";
import ImagesSlider from "./ui/image-slider";
import Link from "next/link";

export default function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1713817173203-f7a9884e77ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  
  return (
    <ImagesSlider className="h-screen" images={images}>
      <div className="relative z-50 w-full h-full flex items-center">
        {/* Left Side - Text Content */}
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex-1 max-w-2xl ml-8 lg:ml-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6"
          >
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-lime-300 text-sm font-medium">Digital Excellence Since 2020</span>
          </motion.div>

          <motion.p
            className="font-bold text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 py-4 text-left leading-tight"
          >
            ELEVATE YOUR <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
              DIGITAL PRESENCE
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-200 max-w-xl mb-8 leading-relaxed"
          >
            We craft immersive digital experiences that drive growth and transform businesses. 
            From stunning websites to powerful marketing strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Link href={'/contact'}>
            <button className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-lime-500/25 transform hover:-translate-y-1">
              Start Project
            </button>
            </Link>

            <Link href={'/portfolio/videos'}>
            <button className="px-8 py-4 backdrop-blur-sm border border-white/20 hover:border-lime-400/50 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10">
              View Portfolio
            </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mt-12"
          >
            <div className="text-left">
              <div className="text-2xl font-bold text-lime-300">150+</div>
              <div className="text-sm text-gray-300">Projects Done</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-lime-300">98%</div>
              <div className="text-sm text-gray-300">Success Rate</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-lime-300">50+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Advanced Design Elements */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="flex-1 flex items-center justify-center relative h-full"
        >
          {/* Floating 3D Card */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateY: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute right-32 top-1/4 w-48 h-60 bg-gradient-to-br from-lime-400/20 to-lime-600/30 backdrop-blur-lg rounded-2xl border border-lime-400/30 shadow-2xl shadow-lime-500/20 p-6"
          >
            <div className="w-8 h-8 bg-lime-400 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-2 bg-lime-400/40 rounded-full"></div>
              <div className="h-2 bg-lime-400/40 rounded-full w-3/4"></div>
              <div className="h-2 bg-lime-400/40 rounded-full w-1/2"></div>
            </div>
          </motion.div>

          {/* Animated Orbital System */}
          <div className="relative w-96 h-96">
            {/* Central Orb */}
            <div className="absolute inset-0 m-auto w-24 h-24 bg-gradient-to-br from-lime-300 to-lime-600 rounded-full shadow-2xl shadow-lime-500/30 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
            </div>

            {/* Orbiting Elements */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 bg-gradient-to-br from-lime-400/80 to-lime-500 rounded-lg shadow-lg flex items-center justify-center"
                animate={{
                  rotate: 360,
                  x: [0, 140, 0],
                  y: [0, 140, 0],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.5
                }}
                style={{
                  transformOrigin: `48px 48px`
                }}
              >
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </motion.div>
            ))}

            {/* Pulse Rings */}
            <motion.div
              className="absolute inset-0 m-auto border-2 border-lime-400/30 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 m-auto border border-lime-300/20 rounded-full"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1
              }}
            />
          </div>

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-lime-400 rounded-full"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.7,
              }}
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}

          {/* Tech Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-20 top-20 w-64 h-64 border border-lime-400/20 rounded-lg transform rotate-45"></div>
            <div className="absolute right-40 bottom-40 w-32 h-32 border border-lime-300/20 rounded-lg transform -rotate-12"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-lime-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-lime-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </ImagesSlider>
  );
}