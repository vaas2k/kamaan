"use client";
import { motion } from "motion/react";
import React from "react";
import ImagesSlider from "./ui/image-slider";
import Link from "next/link";

export default function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?q=80&w=1332&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1713817173203-f7a9884e77ce?q=80&w=1170&auto=format&fit=crop",
  ];

  return (
    <ImagesSlider className="h-[90vh] md:h-screen" images={images}>
      <div className="relative z-50 w-full h-full flex flex-col lg:flex-row items-center px-6 md:px-12">

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-2xl mt-20 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6"
          >
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-lime-300 text-sm font-medium">
              Digital Excellence Since 2020
            </span>
          </motion.div>

          <motion.p className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 py-4 leading-tight">
            ELEVATE YOUR <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
              DIGITAL PRESENCE
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-gray-200 max-w-xl mb-8 leading-relaxed"
          >
            We craft immersive digital experiences that drive growth and transform businesses. 
            From stunning websites to powerful marketing strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href={"/contact"}>
              <button className="px-6 md:px-8 py-3 md:py-4 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-lime-500/25 transform hover:-translate-y-1">
                Start Project
              </button>
            </Link>

            <Link href={"/portfolio/videos"}>
              <button className="px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm border border-white/20 hover:border-lime-400/50 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10">
                View Portfolio
              </button>
            </Link>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mt-10 md:mt-12"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-lime-300">150+</div>
              <div className="text-sm text-gray-300">Projects Done</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-lime-300">98%</div>
              <div className="text-sm text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-lime-300">50+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
          </motion.div>
        </motion.div>


        {/* RIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex items-center justify-center w-full lg:w-auto mt-16 lg:mt-0"
        >
          <div className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
            
            {/* ORBIT SYSTEM */}
            <div className="absolute inset-0 m-auto w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-lime-300 to-lime-600 rounded-full shadow-xl flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full shadow-inner"></div>
            </div>

            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-lime-400/80 to-lime-500 rounded-lg shadow-lg flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.5,
                }}
                style={{
                  transformOrigin: "50% -80px",
                }}
              >
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-9 border-2 border-lime-400 rounded-full flex justify-center"
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
