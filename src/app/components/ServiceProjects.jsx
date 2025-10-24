"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

const ProjectCard = ({
  title,
  description,
  date,
  videoUrl,
  isHovered,
  onHover,
  onLeave,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] px-4">
      <motion.div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -20 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: isHovered ? 50 : 1 }}
        className="group relative cursor-pointer"
      >
        {/* Video container */}
        <div className="relative h-80 mt-7 mb-6 overflow-hidden rounded-lg shadow-lg">
          {videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
              {/* Mute/Unmute Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </motion.button>

              {/* Hover Overlay */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 border-4 border-[#EC4D37] rounded-lg pointer-events-none"
                />
              )}
            </>
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
          <h3 className="text-sm font-medium text-[#EC4D37] mb-2">{title}</h3>

          <h4 className="text-xl font-bold text-[#1F1B1C] mb-4 leading-tight">
            {description}
          </h4>

          <p className="text-gray-600 text-sm">{date}</p>
        </div>
      </motion.div>
    </div>
  );
};

const ServiceProjects = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const x = useMotionValue(0);

  const projects = [
    {
      title: "Event Coverage",
      description: "The Great Indian Garba Fest – Event Coverage",
      date: "2025",
      videoUrl:
        "https://res.cloudinary.com/dqjc5fqyx/video/upload/v1761292635/The_Great_Indian_Garba_Fest_Event_Coverage_umnlpc.mp4",
    },
    {
      title: "Social Buzz Campaign",
      description: "MAWW – Social Buzz Campaign",
      date: "2025",
      videoUrl:
        "https://res.cloudinary.com/dqjc5fqyx/video/upload/v1761292768/MAWW_Social_Buzz_Campaign_cymf24.mp4",
    },
    {
      title: "Social Media Campaign",
      description: "Motorola – Social Media Campaign",
      date: "2025",
      videoUrl:
        "https://res.cloudinary.com/dqjc5fqyx/video/upload/v1761292836/Motorola_Social_Media_Campaign_tuwy8k.mp4",
    },
    {
      title: "Testimonial Ad",
      description: "Innovarch Testimonial Ad",
      date: "2025",
      videoUrl:
        "https://res.cloudinary.com/dqjc5fqyx/video/upload/v1761292958/Innovarch_Testimonial_Ad_hsjsnk.mp4",
    },
    {
      title: "DVC Campaign",
      description: "CAB Curtains – DVC Campaign",
      date: "2025",
      videoUrl:
        "https://res.cloudinary.com/dqjc5fqyx/video/upload/v1761293019/CAB_Curtains_DVC_Campaign_zbpgpt.mp4",
    },
  ];

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects, ...projects];
  const cardWidth = 382; // 350px + 32px padding
  const loopWidth = cardWidth * projects.length;

  // Smooth infinite scroll animation
  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      const speed = 0.5; // pixels per frame
      let currentX = x.get();
      currentX -= speed;

      // Reset position for seamless loop
      if (currentX <= -loopWidth) {
        currentX += loopWidth;
      }

      x.set(currentX);
    }
  });

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
                <span className="text-[#EC4D37]">Highlights</span>
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
              <Link href="/contactus"><span>Contact Us</span></Link>
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

        {/* Carousel Section */}
        <div className="relative overflow-hidden py-8">
          <motion.div className="flex" style={{ x }}>
            {duplicatedProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                date={project.date}
                videoUrl={project.videoUrl}
                isHovered={hoveredIndex === index}
                onHover={() => {
                  setIsPaused(true);
                  setHoveredIndex(index);
                }}
                onLeave={() => {
                  setIsPaused(false);
                  setHoveredIndex(null);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProjects;
