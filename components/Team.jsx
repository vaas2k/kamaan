"use client";
import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Kazim Hassani",
      role: "Founder - Video Editor - Game Dev - 3D",
      // description: "Leading our creative vision with 8+ years in 3D animation and visual storytelling. Specializes in character design and cinematic animations.",
      image: "/team/kazim.jpg",
      technologies: ["Blender", "Premire Pro", "Unreal Engine"],
      social: {
        linkedin: "#",
        github: "#",
        email: "alex@kamaan.com"
      },
      featured: true
    },
    {
      id: 1,
      name: "Muhammad Ibrahim",
      role: "Video Editor - Designer",
      // description: "Leading our creative vision with 8+ years in 3D animation and visual storytelling. Specializes in character design and cinematic animations.",
      image: "/team/ibrahim.jpg",
      technologies: ["Premire Pro", "Capcut Pro", "Davincii"],
      social: {
        linkedin: "#",
        github: "#",
        email: "alex@kamaan.com"
      },
      featured: true
    },
     {
      id: 1,
      name: "Malik Ismail",
      role: "Web Developer",
      // description: "Leading our creative vision with 8+ years in 3D animation and visual storytelling. Specializes in character design and cinematic animations.",
      image: "/team/ibrahim.jpg",
      technologies: ["ReactJS", "NextJS", "Typescript"],
      social: {
        linkedin: "#",
        github: "#",
        email: "alex@kamaan.com"
      },
      featured: true
    }, 
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "15+", label: "Years Combined Experience" },
    { number: "24/7", label: "Team Support" }
  ];

  const roles = {
    "3D Modeling": teamMembers.filter(member => member.role.includes('3D')).length,
    "Video Editing": teamMembers.filter(member => member.role.includes('Video')).length,
    "Web Development": teamMembers.filter(member => member.role.includes('Developer')).length,
    "Design": teamMembers.filter(member => member.role.includes('Design')).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
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
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span className="text-lime-300 text-sm font-medium tracking-wide">
              MEET OUR TEAM
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            THE CREATIVE MINDS{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
              BEHIND THE MAGIC
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A diverse team of passionate experts in video editing, 3D modeling, and web development 
            dedicated to bringing your vision to life with innovation and precision.
          </motion.p>
        </motion.div>

        {/* Team Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {Object.entries(roles).map(([role, count], index) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-lime-500/20 rounded-xl p-4 text-center hover:border-lime-500/50 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-lime-400 mb-1">{count}</div>
              <div className="text-gray-300 text-sm font-medium">{role}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-500">
              Leadership Team
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.filter(member => member.featured).map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} featured={true} />
            ))}
          </div>
        </motion.div>

        {/* Full Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Our <span className="text-lime-400">Expert</span> Team
          </h3> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.filter(member => !member.featured).map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} featured={false} />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-2">{stat.number}</div>
              <div className="text-gray-400 font-medium text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-lime-500/10 to-lime-600/10 backdrop-blur-sm border border-lime-500/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            READY TO WORK WITH OUR TEAM?
          </h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Let's connect your project with the perfect specialists from our team. 
            Get started with a free consultation today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-lime-500 text-lime-400 hover:bg-lime-500/10 font-bold rounded-lg transition-all duration-300"
              >
              Schedule Consultation
            </motion.button>
              </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member, index, featured }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      key={index}
    >
      <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10 h-full flex flex-col ${
        featured ? 'md:min-h-[500px]' : ''
      }`}>
        
        {/* Image Container - Always show full image */}
        <div className="relative w-full pt-[100%] overflow-hidden "> {/* Square aspect ratio */}
          <motion.img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-contain p-4" /* Changed to object-contain with padding */
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Featured Badge */}
          {/* {featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-lime-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Lead
              </span>
            </div>
          )} */}

          {/* Social Links */}
          {/* <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <motion.a
              href={member.social.linkedin}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-colors"
            >
              <Linkedin size={16} className="text-white" />
            </motion.a>
            <motion.a
              href={member.social.github}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg transition-colors"
            >
              <Github size={16} className="text-white" />
            </motion.a>
            <motion.a
              href={`mailto:${member.social.email}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-lime-500 hover:bg-lime-600 rounded-lg shadow-lg transition-colors"
            >
              <Mail size={16} className="text-white" />
            </motion.a>
          </div> */}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-lime-300 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-lime-400 text-sm font-medium">{member.role}</p>
          </div>
          
          <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
            {member.description}
          </p>

          {/* Technologies/Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Contact Button */}
          {/* <motion.a
            href={`mailto:${member.social.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-lime-500/10 border border-lime-500/30 text-lime-400 rounded-lg font-semibold hover:bg-lime-500/20 hover:border-lime-400/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>Contact {member.name.split(' ')[0]}</span>
            <Mail size={16} className="transform group-hover/btn:scale-110 transition-transform" />
          </motion.a> */}
        </div>
      </div>
    </motion.div>
  );
};

export default Team;  