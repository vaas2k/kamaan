"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Logo/Brand Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-6"
            >
              PISCLE
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-6"
            >
              WELCOME TO OUR DIGITAL WEBSITE DESIGN AGENCY. THE BEST EXPERIENCE.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-lime-500/50 to-transparent mb-8"
            />
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              SERVICES
            </h3>
            <ul className="space-y-4">
              {[
                "Meet the team",
                "Our services", 
                "Latest news",
                "About us",
                "Contact us"
              ].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href="#"
                    className="text-gray-400 hover:text-lime-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-4">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="p-2 bg-lime-500/10 rounded-lg group-hover:bg-lime-500/20 transition-colors duration-300">
                  <Mail size={16} className="text-lime-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Your email</div>
                  <div className="text-white hover:text-lime-400 transition-colors duration-300">
                    contact@example.com
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="p-2 bg-lime-500/10 rounded-lg group-hover:bg-lime-500/20 transition-colors duration-300">
                  <Phone size={16} className="text-lime-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone number</div>
                  <div className="text-white hover:text-lime-400 transition-colors duration-300">
                    +92 (866) 888 0000
                  </div>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="p-2 bg-lime-500/10 rounded-lg group-hover:bg-lime-500/20 transition-colors duration-300">
                  <MapPin size={16} className="text-lime-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Our location</div>
                  <div className="text-white hover:text-lime-400 transition-colors duration-300">
                    Digital Street, Tech City
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: 1.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent my-8"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Copyrights by{" "}
            <Link href={'synwavesolutions.com'} className="text-lime-400 font-semibold">Synwave Solutions</Link>
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="relative">
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-4 h-4 bg-lime-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 right-20 w-3 h-3 bg-lime-500 rounded-full blur-sm"
        />
      </div>
    </footer>
  );
};

export default Footer;