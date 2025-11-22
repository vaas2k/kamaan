"use client";
import React from "react";
import { motion } from "framer-motion";

const Quality = () => {
  const features = [
    {
      number: "01",
      title: "QUALITY SERVICES",
      description: "Lorem ipsum dolor sited is amet consectetur norted."
    },
    {
      number: "02",
      title: "SKILLED DEVELOPERS",
      description: "Lorem ipsum dolor sited is amet consectetur norted."
    }
  ];

  const skills = [
    { name: "DEVELOPMENT", percentage: 90 },
    { name: "DESIGNING", percentage: 85 },
    { name: "MARKETING", percentage: 78 },
    { name: "BRANDING", percentage: 92 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20"
            >
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span className="text-lime-300 text-sm font-medium tracking-wide">
                SIGHT IN SURPRACE!
              </span>
            </motion.div>

            {/* Main Headings */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
                  Agency
                </span>
              </h1>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                CREATING MODERN AND<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-lime-600">
                  NEW SOLUTIONS
                </span>
              </h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg leading-relaxed max-w-2xl"
            >
              Lorem ipsum is simply free text dolor sit amet, consectetur norted adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorim andrin.
            </motion.p>

            {/* Features List */}
            <div className="space-y-6 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-12 h-12 bg-lime-500/10 border border-lime-500/30 rounded-lg flex items-center justify-center group-hover:bg-lime-500/20 transition-all duration-300">
                    <span className="text-lime-400 font-bold text-lg">{feature.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Skills Progress */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Skills Progress Bars */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-lime-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                OUR EXPERTISE
              </h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold text-sm uppercase tracking-wide">
                        {skill.name}
                      </span>
                      <span className="text-lime-400 font-bold text-sm">
                        {skill.percentage}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-lime-400 to-lime-600 rounded-full relative"
                      >
                        {/* Animated Glow Effect */}
                        <motion.div
                          animate={{
                            x: ["0%", "100%", "0%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats at Bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-700"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime-400">150+</div>
                  <div className="text-gray-400 text-sm mt-1">Projects Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime-400">98%</div>
                  <div className="text-gray-400 text-sm mt-1">Success Rate</div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-lime-400/20 rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-lime-500/30 rounded-full blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quality;