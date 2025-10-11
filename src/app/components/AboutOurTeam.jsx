import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TeamShowcase = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Harsh Kuria",
      designation: "Founder & CEO",
      image: "/member-1.png",
      skills: ["Vision Strategy", "Team Leadership"],
    },
    {
      id: 2,
      name: "Harshit Singh",
      designation: "Co-founder & COO",
      image: "/member-2.png",
      skills: ["Operations Management", "Client Relations"],
    },
    {
      id: 3,
      name: "Jungkal Brahma",
      designation: "Art Director",
      image: "/member-3.png",
      skills: ["Creative Vision", "Brand Direction"],
    },
    {
      id: 4,
      name: "Vipul Kumar",
      designation: "Design Head",
      image: "/member-4.png",
      skills: ["Visual Design", "Brand Identity"],
    },
    {
      id: 5,
      name: "Naman Dadhich",
      designation: "Cinematographer",
      image: "/member-5.png",
      skills: ["Visual Storytelling", "Motion Capture"],
    },
    {
      id: 6,
      name: "Aman Mann",
      designation: "Photographer",
      image: "/member-6.png",
      skills: ["Product Photography", "Brand Campaigns"],
    },
    {
      id: 7,
      name: "Aditya Xopun Borah",
      designation: "Photographer",
      image: "/member-7.png",
      skills: ["Editorial Photography", "Event Coverage"],
    },
  ];

  // Triple the array for seamless infinite scroll
  const duplicatedMembers = [...teamMembers, ...teamMembers, ...teamMembers];
  const cardWidth = 320;
  const totalWidth = teamMembers.length * cardWidth;

  // Continuous scroll animation
  useEffect(() => {
    const scroll = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1.5; // Slightly faster scroll
        return newPosition >= totalWidth ? 0 : newPosition;
      });
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [totalWidth]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Engage With Our Creative Team
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We work to create the most attractive & meaningful place for small
            businesses.
            <br />
            Our Team always ready to help you.
          </p>
        </motion.div>

        {/* Continuous Scrolling Team Cards */}
        <motion.div className="relative py-1" variants={itemVariants}>
          {/* Scrolling Container */}
          <div className="overflow-hidden relative h-[600px]">
            <motion.div
              ref={containerRef}
              className="flex gap-8 will-change-transform absolute"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                width: `${duplicatedMembers.length * cardWidth}px`,
              }}
            >
              {duplicatedMembers.map((member, index) => (
                <div
                  key={`${member.id}-${Math.floor(
                    index / teamMembers.length
                  )}-${index % teamMembers.length}`}
                  className="flex-shrink-0 w-80 group"
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer bg-white h-full transition-transform duration-700 group-hover:scale-105"
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: (index % 6) * 0.1 },
                    }}
                  >
                    <div className="w-full h-96 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover "
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-orange-500 font-medium">
                        {member.designation}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {member?.skills
                          ?.slice(0, 2)
                          .map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TeamShowcase;
