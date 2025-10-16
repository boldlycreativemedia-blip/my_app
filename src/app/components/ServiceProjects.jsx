"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ProjectCard = ({ title, description, date, delay = 0, videoUrl }) => {
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
      className="group relative cursor-pointer"
    >
      {/* Video container */}
      <div className="relative h-64 mb-6 overflow-hidden rounded-lg shadow-lg">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm">Project Video</p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <motion.h3
          className="text-sm font-medium text-[#EC4D37] mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.4, duration: 0.5 }}
        >
          {title}
        </motion.h3>

        <motion.h4
          className="text-xl font-bold text-[#1F1B1C] mb-4 leading-tight"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
        >
          {description}
        </motion.h4>

        <motion.p
          className="text-gray-600 text-sm"
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
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const projects = [
    {
      title: "Web Development",
      description: "Covers marketing, sales, and customer service.",
      date: "Dec 02, 2025",
      videoUrl: "", // Add your video URL here
    },
    {
      title: "Social Media Ads",
      description: "Covers marketing, sales, and customer service.",
      date: "Dec 02, 2025",
      videoUrl: "", // Add your video URL here
    },
    {
      title: "Business",
      description: "Covers marketing, sales, and customer service.",
      date: "Dec 02, 2025",
      videoUrl: "", // Add your video URL here
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
                  className="bg-[#EC4D37] bg-clip-text text-transparent"
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

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group cursor-pointer bg-[#1F1B1C] hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-3 transition-all duration-300 shadow-lg"
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
              videoUrl={project.videoUrl}
              delay={index * 0.2}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceProjects;
