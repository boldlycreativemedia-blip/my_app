"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutSecondSection = () => {
  // Animation variants for fade in
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Header animation
  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const coreValues = [
    {
      id: 1,
      letter: "V",
      title: "Vision",
      description:
        "We See Beyond The Ordinary, Pushing Creative Boundaries With Forward-Thinking Ideas.",
    },
    {
      id: 2,
      letter: "I",
      title: "Innovation",
      description:
        "We're Committed To Breaking New Ground, Constantly Evolving To Deliver Cutting-Edge Solutions.",
    },
    {
      id: 3,
      letter: "B",
      title: "Boldness",
      description:
        "We Create Fearlessly, Embracing Original Thinking To Help Your Brand Stand Out From The Noise.",
    },
    {
      id: 4,
      letter: "E",
      title: "Excellence",
      description:
        "We Strive For Nothing Less Than Extraordinary, Pouring Our Passion Into Every Detail Of Our Work.",
    },
    {
      id: 5,
      letter: "S",
      title: "Storytelling",
      description:
        "We Believe Every Brand Has A Powerful Story. We Find It And Bring It To Life In An Unforgettable Way.",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-start gap-2 mb-8">
            <div className="w-3 h-3 bg-[#EC4D37] rounded-full mt-2"></div>
            <span className="text-lg text-gray-700">Our Values</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Title */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              variants={headerVariants}
            >
              The BOLDLY
              <br />
              Difference
            </motion.h2>

            {/* Right Column - Description */}
            <motion.div className="space-y-4" variants={headerVariants}>
              <p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
                We Are Committed To Creating A Visually Stunning And Impactful
                Brand Presence For Every Business We Partner With.{" "}
                <span className="text-gray-500">
                  Our Team Is Ready To Push Boundaries And Bring Your Vision To
                  Life.
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Core Values List */}
        <motion.div
          className="space-y-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {coreValues.map((value) => (
            <motion.div
              key={value.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center"
              variants={fadeInVariants}
            >
              {/* Left Column - Letter and Title */}
              <div className="flex items-center gap-6 sm:gap-8">
                <span className="text-6xl sm:text-7xl md:text-7xl font-bold text-[#EC4D37] leading-none w-16 sm:w-20 md:w-24 flex-shrink-0 flex items-center justify-center">
                  {value.letter}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {value.title}
                </h3>
              </div>

              {/* Right Column - Description */}
              <div>
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-base sm:text-lg text-gray-700 max-w-6xl mx-auto leading-relaxed">
            More Than Just Values, Our{" "}
            <span className="text-[#EC4D37] font-semibold">V.I.B.E.S.</span>{" "}
            Define Our Culture. It's The Energy That Drives Us, The Boldness
            That Defines Us, And The Creativity That Sets Us Apart. Let's Create
            Something Unforgettable—Together.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSecondSection;
