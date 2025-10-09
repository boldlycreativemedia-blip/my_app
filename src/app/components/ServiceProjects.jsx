"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ProjectCard = ({ title, description, date, delay = 0, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Simple image container */}
      <div className="relative h-64 mb-6 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm">Project Image</p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <motion.h3
          className="text-sm font-medium text-emerald-800 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.4, duration: 0.5 }}
        >
          {title}
        </motion.h3>

        <motion.h4
          className="text-xl font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
        >
          {description}
        </motion.h4>

        <motion.p
          className="text-emerald-100 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.5 }}
        >
          {date}
        </motion.p>
      </div>
    </motion.div>
  );
};

const ServiceProjects = () => {
  const projects = [
    {
      title: "Web Development",
      description: "Covers marketing, sales, and customer service.",
      date: "Dec 02, 2025",
      imageUrl: "", // Add your image URL here
    },
    {
      title: "Social Media Ads",
      description: "Covers marketing, sales, and customer service.",
      date: "Dec 02, 2025",
      imageUrl: "", // Add your image URL here
    },
    {
      title: "Business",
      description: "Covers marketing, sales, and customer service.",
      date: "Dec 02, 2025",
      imageUrl: "", // Add your image URL here
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16">
          <div className="lg:max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            >
              View Our Project{" "}
              <span className="block">
                <motion.span
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Highlights
                </motion.span>
              </span>
            </motion.h1>
          </div>

          <div className="lg:max-w-md mt-8 lg:mt-0">
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-gray-600 text-lg leading-relaxed mb-8"
            >
              See how we combine creative vision with strategic execution. These
              project highlights demonstrate the powerful impact of stunning
              visuals and unforgettable brand experiences.
            </motion.p>

            <Link href="contactus">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-3 transition-all duration-300 shadow-lg"
              >
                <span>Contact Us</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              date={project.date}
              imageUrl={project.imageUrl}
              delay={index * 0.2}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceProjects;
