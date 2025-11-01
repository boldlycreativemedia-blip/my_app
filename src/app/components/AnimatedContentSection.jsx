"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AnimatedContentSection({
  isAnimatingRef,
  handlePlayClick,
  isPlaying,
}) {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  // Check if elements are in view
  const isLeftInView = useInView(leftColumnRef, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });
  const isRightInView = useInView(rightColumnRef, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });

  // Animation variants
  const leftSlideVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const rightSlideVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollPositionRef = useRef(0); // Use ref instead of state
  const animationRef = useRef(null);

  const brands = [
    { image: "/Brand-1.png", alt: "Brand 1" },
    { image: "/Brand-2.png", alt: "Brand 2" },
    { image: "/Brand-3.png", alt: "Brand 3" },
    { image: "/Brand-4.png", alt: "Brand 4" },
    { image: "/Brand-5.png", alt: "Brand 5" },
    { image: "/Brand-6.png", alt: "Brand 6" },
    { image: "/Brand-7.png", alt: "Brand 7" },
  ];

  // Duplicate brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1;

    const animate = () => {
      if (!isHovered && !isDragging && scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth / 2;

        scrollPositionRef.current += scrollSpeed;

        // Reset to beginning for seamless loop
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0;
        }

        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging]); // Keep dependencies but use ref for position

  // Sync ref with actual scroll position when user manually scrolls
  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Update the ref to match current scroll position
    scrollPositionRef.current = scrollContainer.scrollLeft;

    const maxScroll = scrollContainer.scrollWidth / 2;

    // Reset scroll position for seamless loop when reaching the end
    if (scrollContainer.scrollLeft >= maxScroll - 10) {
      scrollContainer.scrollLeft = 0;
      scrollPositionRef.current = 0;
    }
  };
  return (
    <section
      className="relative z-10 bg-white w-full px-8 md:px-8 py-16 md:py-28 min-h-screen flex justify-center"
      ref={sectionRef}
    >
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Service Categories at Bottom */}
        <motion.div
          className="max-w-[1920px] mx-auto md:ml-8 md:mr-8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 xl:gap-32 mb-8 md:-mt-18"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            "Cinematic Videos",
            "Engaging Social Media",
            "Stunning Website Design",
          ].map((service, index) => (
            <motion.span
              key={service}
              className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              {service}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Content Container */}
        <div className="w-full max-w-[1920px] mx-auto pr-10 px-0 md:px-6 py-6 sm:py-16">
          {/* Main Heading Section */}
          <div className="relative">
            {/* LEFT CONTENT - Main Heading */}
            <motion.div
              className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-7xl gap-4"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-tight text-black mb-6 sm:mb-8 md:mb-12 pr-4 md:pr-0"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Brand in Motion,
                <br />
                <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-10">
                  Your Story Comes Alive
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 bg-[#EC4D37] rounded-full flex-shrink-0">
                    <Image
                      src="/finance_mode.png"
                      alt="draw"
                      width={20}
                      height={20}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    />
                  </span>
                </span>
              </motion.h1>

              {/* Background Text - "Amplified" for Mobile */}
              <motion.div
                className="block md:hidden mb-6 -mt-8"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="text-[#BBBBBB] text-2xl sm:text-3xl md:text-4xl font-bold leading-none select-none text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  \\Amplified
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block"
              >
                <motion.div
                  className="group bg-[#EC4D37] hover:bg-[#e74b36] text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 cursor-pointer relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Free Consultation
                  <motion.span
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white bg-opacity-20 rounded-full inline-flex items-center justify-center"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black pointer-events-none" />
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats positioned on the right - Desktop */}
            <motion.div
              className="hidden md:block absolute top-0 right-0 z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-right">
                <div className="text-4xl lg:text-5xl font-bold text-black mb-2">
                  120%
                </div>
                <div className="text-gray-600 text-lg leading-tight">
                  Increase in
                  <br />
                  online sales
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Stats - Only visible on mobile */}
          <motion.div
            className="block md:hidden mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl sm:text-5xl font-bold text-black mb-2">
              120%
            </div>
            <div className="text-gray-600 text-base sm:text-lg leading-tight">
              Increase in online sales
            </div>
          </motion.div>

          {/* Background Text - "Your Growth" - Desktop */}
          <motion.div
            className="relative hidden md:block mt-8 sm:mt-12 md:-mt-24"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="text-[#BBBBBB] text-6xl lg:text-8xl font-bold leading-none select-none text-right overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              \\Amplified
            </motion.div>
          </motion.div>
        </div>

        {/* Moving Brand Logos Section */}
        <motion.div
          className="bg-white relative overflow-hidden mx-0 md:ml-2 md:mr-7 my-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div
            ref={scrollRef}
            className="flex items-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto cursor-grab active:cursor-grabbing select-none py-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onScroll={handleScroll}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`brand-${index}`}
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 px-2 md:px-4 group"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={brand.image}
                  alt={brand.alt}
                  className="h-20 sm:h-24 md:h-30 lg:h-36 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>

        {/* Two-column layout with scroll animations */}
        <div className="w-full max-w-[1900px] mx-auto px-0 md:px-4">
          {/* Our Team Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#EC4D37]"></div>
            <span className="text-[#1F1B1C] font-medium text-sm sm:text-base">
              Why Choose Us?
            </span>
          </div>

          {/* First Row - Text Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* LEFT COLUMN */}
            <motion.div
              ref={leftColumnRef}
              className="space-y-6 md:space-y-8"
              variants={leftSlideVariants}
              initial="hidden"
              animate={isLeftInView ? "visible" : "hidden"}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                variants={childVariants}
              >
                Your Complete
                <br />
                Creative Journey
                <br />
                From Vision to
                <br />
                Results That <span className="font-black">Last</span>
              </motion.h2>
            </motion.div>

            {/* RIGHT COLUMN - Text Content */}
            <motion.div
              ref={rightColumnRef}
              className="space-y-6"
              variants={rightSlideVariants}
              initial="hidden"
              animate={isRightInView ? "visible" : "hidden"}
            >
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-[23px] md:mt-12 text-gray-900 leading-relaxed font-medium"
                variants={childVariants}
              >
                We simplify the entire creative journey—from strategy and
                planning to production, editing, and beyond. We simplify the
                entire creative journey—from strategy and planning to
                production, editing, and beyond.{" "}
                <span className="text-gray-500">
                  Our team manages logistics, coordination, and on-set
                  execution, while post-production brings your content to life
                  with edits, refinements, and revisions that ensure quality and
                  impact.
                </span>
              </motion.p>
            </motion.div>
          </div>

          {/* Second Row - Chart and Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch mt-8 md:mt-12">
            {/* LEFT - Vertical Bar Chart Card */}
            <motion.div
              className="bg-gray-900 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 w-full flex flex-col relative overflow-hidden"
              variants={childVariants}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.p
                className="text-xs sm:text-sm text-gray-400 mb-1"
                variants={childVariants}
              >
                Rise in conversion
              </motion.p>
              <motion.p
                className="text-3xl sm:text-4xl font-bold mb-6 md:mb-8"
                variants={childVariants}
              >
                +20%
              </motion.p>

              {/* Vertical Bar Chart */}
              <div className="flex items-end justify-center gap-3 md:gap-4 flex-1">
                {[
                  {
                    label: "Engagement",
                    percent: 55,
                    color: "bg-red-500",
                    height: "55%",
                  },
                  {
                    label: "Brand Awareness",
                    percent: 75,
                    color: "bg-sky-400",
                    height: "75%",
                  },
                  {
                    label: "Reach",
                    percent: 200,
                    color: "bg-yellow-400",
                    height: "100%",
                  },
                  {
                    label: "Client ROI",
                    percent: 150,
                    color: "bg-emerald-400",
                    height: "75%",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex flex-col items-center gap-2 flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isLeftInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {/* Bar */}
                    <div
                      className="relative w-full bg-gray-700 rounded-t-lg overflow-hidden"
                      style={{ height: "120px" }}
                    >
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 ${item.color} rounded-t-lg flex items-start justify-center pt-2`}
                        initial={{ height: 0 }}
                        animate={
                          isLeftInView ? { height: item.height } : { height: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 1 + index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <span className="text-xs font-bold text-gray-900">
                          {item.percent}%
                        </span>
                      </motion.div>
                    </div>

                    {/* Label */}
                    <span className="text-[10px] sm:text-xs text-gray-300 text-center leading-tight">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT - Team Image with Play Button */}
            <motion.div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer flex items-center justify-center min-h-[300px] md:min-h-0"
              variants={childVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onClick={handlePlayClick}
            >
              {!isPlaying ? (
                <>
                  {/* Video Thumbnail Image */}
                  <div className="w-full h-full flex items-center justify-center relative bg-gray-200">
                    <div className="text-gray-400 text-sm">Video Thumbnail</div>
                  </div>

                  {/* Animated Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Ripple Animation Background */}
                    <motion.div
                      className="absolute bg-white bg-opacity-20 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0.3, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ width: "100px", height: "100px" }}
                    />

                    {/* Main Play Button */}
                    <motion.div
                      className="bg-white rounded-full p-4 md:p-6 shadow-lg relative z-10"
                      whileHover={{
                        scale: 1.1,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        scale: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <motion.div
                        animate={{
                          x: [0, 2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-red-500 fill-current" />
                      </motion.div>
                    </motion.div>

                    {/* Secondary Ripple */}
                    <motion.div
                      className="absolute bg-white bg-opacity-10 rounded-full"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                </>
              ) : (
                /* Actual Video Player */
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                >
                  <source
                    src="https://res.cloudinary.com/dqjc5fqyx/video/upload/v1739723931/BOLDLY_CREATIVE_MEDIA_3_xsl1da.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
