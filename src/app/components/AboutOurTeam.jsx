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
      name: "Anirudh Vohra",
      designation: "Creative Director",
      image: "/member-8.jpg",
      skills: ["Brand Strategy", "Visual Direction"],
    },
    {
      id: 4,
      name: "Jungkal Brahma",
      designation: "Art Director",
      image: "/member-3.png",
      skills: ["Creative Vision", "Brand Direction"],
    },
    {
      id: 5,
      name: "Vipul Kumar",
      designation: "Design Head",
      image: "/member-4.png",
      skills: ["Visual Design", "Brand Identity"],
    },
    {
      id: 6,
      name: "Naman Dadhich",
      designation: "Cinematographer",
      image: "/member-5.png",
      skills: ["Visual Storytelling", "Motion Capture"],
    },
    {
      id: 7,
      name: "Aman Mann",
      designation: "Photographer",
      image: "/member-6.png",
      skills: ["Product Photography", "Brand Campaigns"],
    },
    {
      id: 8,
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
        const newPosition = prev + 1; // Slightly faster scroll
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
    <div className="min-h-screen bg-[#F8F8F8] pt-10 pb-1 px-2  relative overflow-hidden">
      {/* Our Team Badge */}
          <div className="flex items-center justify-center gap-2 ">
            <div className="w-2 h-2 rounded-full bg-[#EC4D37]"></div>
            <span className="text-[#1F1B1C] font-medium text-sm sm:text-base">
              Our Team
            </span>
          </div>
      <motion.div
        className="max-w-[1920px] ml-6 mr-6 md:ml-12 md:mr-12 mx-auto"
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
          <div className="overflow-hidden relative h-[520px]">
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
                    className="relative mt-5 overflow-hidden rounded-2xl  cursor-pointer bg-white h-full transition-transform duration-700 group-hover:scale-105"
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
                    <div className="w-full h-72 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover "
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-transperent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Member Info */}
                    <div className="p-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-orange-500 font-medium">
                        {member.designation}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {member?.skills
                          ?.slice(0, 2)
                          .map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className=" py-1 text-xs bg-[#F8F8F8] text-gray-600 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
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
