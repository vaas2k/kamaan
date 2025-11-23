"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Video, Cuboid, Globe } from "lucide-react";
import Link from "next/link";

const Services = () => {
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

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Happy Clients" }
  ];

  const clients = [
    { name: "envatio", logo: "E" },
    { name: "envatio", logo: "E" },
    { name: "envatio", logo: "E" },
    { name: "envatio", logo: "E" },
    { name: "envatio", logo: "E" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Services Grid */}
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            READY FOR THE OUTSTANDING SERVICES?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={'/contact'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-lime-500/25"
              >
                GET STARTED
              </motion.button>
            </Link>
            <Link href={'/portfolio/vidoes'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-lime-500 text-lime-400 hover:bg-lime-500/10 font-bold rounded-lg transition-all duration-300"
              >
                VIEW PORTFOLIO
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-20"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-4">
              <Star size={16} className="text-lime-400" />
              <span className="text-lime-300 text-sm font-medium">Trusted by Thousands</span>
            </div>
            <p className="text-2xl text-gray-300">
              We've <span className="text-lime-400 font-bold">37800</span> satisfied customers with our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-lime-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-12">OUR HAPPY CLIENTS</h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-lime-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {client.logo}
                </div>
                <div className="mt-3 text-gray-300 font-medium">{client.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;