"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Store, BarChart3, Maximize2 } from "lucide-react";

const AboutSecondSection = () => {
  // Animation variants for left to right movement
  const leftToRightVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for right to left movement
  const rightToLeftVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Stagger animation for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Header animation
  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  console.log("Imports check:", {
    Target,
    Store,
    BarChart3,
    Maximize2,
    motion,
  });

  const coreValues = [
    {
      id: 1,
      title: "Innovation",
      description:
        "We're committed to breaking new ground, constantly evolving to deliver cutting-edge solutions.",
        icon:Target,
      position: "left",
    },
    {
      id: 2,
      title: "Boldness",
      description:
        "We're commited to breaking new ground, constantly evolving to deliver cutting-edge solutions.",
      icon: Store,
      position: "right",
    },
    {
      id: 3,
      title: "Excellence",
      description:
        "We strive for nothing less than extraordinary, pouring our passion into every detail of our work.",
      icon: Maximize2,
      position: "left",
    },
    {
      id: 4,
      title: "Storytelling",
      description:
        "We believe every brand has a powerful story. We find it and bring it to life in an unforgettable way.",
      icon: BarChart3,
      position: "right",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            variants={headerVariants}
          >
            THE BOLDLY DIFFERENCE
          </motion.h2>
          <motion.div className="space-y-2" variants={headerVariants}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              We are committed to creating a visually stunning and impactful
              brand presence for every business we partner with.
              </p>
              <p className="text-lg sm:text-xl text-gray-600">
                Our team is ready to push boundaries and bring your vision to
                life.
              </p>
          </motion.div>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {coreValues.map((value) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                variants={
                  value.position === "left"
                    ? rightToLeftVariants
                    : leftToRightVariants
                }
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 w-12 cursor-pointer h-12 sm:w-16 sm:h-16 bg-gray-900 rounded-xl flex items-center justify-center"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {value.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 text-sm sm:text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {value.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSecondSection;
