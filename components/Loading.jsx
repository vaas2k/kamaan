'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  // Animation variants for the dots
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 0.5,
          ease: 'easeInOut'
        }
      }
    }
  }

  // Staggered animation for each dot
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <motion.div 
        className="flex items-center justify-center space-x-2 mb-4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400"
            variants={dotVariants}
            style={{
              // Different colors for each dot
              background: i === 0 ? '#3B82F6' : i === 1 ? '#60A5FA' : '#93C5FD'
            }}
          />
        ))}
      </motion.div>
      
      <motion.p 
        className="text-gray-600 dark:text-gray-300 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
      >
        Loading...
      </motion.p>
    </div>
  )
}

export default Loading