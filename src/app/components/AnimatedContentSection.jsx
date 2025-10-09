"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Smartphone,
  Search,
  Monitor,
  ShoppingCart,
  Users,
  Play,
  Music,
  MessageCircle,
  Camera,
  Video,
  ChevronUp,
  ArrowRight,
} from "lucide-react";1
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

  const brands = [
    { name: "Apple", icon: Smartphone },
    { name: "Google", icon: Search },
    { name: "Microsoft", icon: Monitor },
    { name: "Amazon", icon: ShoppingCart },
    { name: "Meta", icon: Users },
    { name: "Netflix", icon: Play },
    { name: "Spotify", icon: Music },
    { name: "Twitter", icon: MessageCircle },
    { name: "Instagram", icon: Camera },
    { name: "YouTube", icon: Video },
  ];

  // Duplicate brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || isDragging) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth / 2; // Half because we duplicated the array

    let scrollPosition = maxScroll; // Start at the midpoint for reverse scrolling
    const scrollSpeed = 1; // Pixels per frame

    const animate = () => {
      if (!isHovered && !isDragging) {
        scrollPosition += scrollSpeed; // 👈 Move left to right

        // Reset to end for seamless loop
        if (scrollPosition <= 0) {
          scrollPosition = maxScroll;
        }

        if (scrollContainer) {
          scrollContainer.scrollLeft = scrollPosition;
        }
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Handle manual scroll
  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const maxScroll = scrollWidth / 2;

    // Reset scroll position for seamless loop when reaching the end
    if (scrollContainer.scrollLeft >= maxScroll - 10) {
      scrollContainer.scrollLeft = 0;
    }
  };

  return (
    <section
      className="relative z-10 bg-gray-50 w-full px-6 md:px-12 py-28 min-h-screen"
      ref={sectionRef}
    >
      <div className="max-w-max">
        {/* Service Categories at Bottom */}
        <motion.div
          className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center xl:gap-32 -mt-18"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            "Cinematic Videos",
            "Engaging Social Media",
            "Stunnig Website Design",
          ].map((service, index) => (
            <motion.span
              key={service}
              className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium text-center"
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
        <div className="max-w-9xl mx-auto px-4 sm:px-6 py-6 sm:py-16">
          {/* Main Heading Section */}
          <div className="relative">
            {/* LEFT CONTENT - Main Heading */}
            <motion.div
              className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-6xl"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-bold leading-tight sm:leading-none text-black mb-6 sm:mb-8 md:mb-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Brand in Motion,
                <br />
                <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  Your Story
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-500 rounded-full flex-shrink-0">
                    <Image
                      src="/finance_mode.png"
                      alt="finance"
                      width={20}
                      height={20}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    />
                  </span>
                  Amplified
                </span>
              </motion.h1>

              {/* CTA Button */}
              <motion.button
                className="group bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 sm:gap-3 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Consultation
                <motion.div
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Stats positioned on the right */}
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

          {/* Background Text - "Your Growth" */}
          <motion.div
            className="relative mt-8 sm:mt-12 md:-mt-24"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="text-gray-300 md:text-gray-400 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-center md:text-right overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              \\Your Growth
            </motion.div>
          </motion.div>
        </div>

        {/* Moving Brand Logos Section */}
        <motion.div
          className="py-12 bg-gray-50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-12 md:gap-16 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: { display: "none" },
            }}
            onMouseEnter={() => setIsHovered(true)}
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
                key={`${brand.name}-${index}`}
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors duration-300 whitespace-nowrap flex-shrink-0 px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <brand.icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-lg md:text-xl lg:text-2xl font-semibold">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Custom Scrollbar Hide */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>

        {/* Two-column layout with scroll animations */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-20">
          {/* LEFT COLUMN - Slides in from left */}
          <motion.div
            ref={leftColumnRef}
            className="space-y-8"
            variants={leftSlideVariants}
            initial="hidden"
            animate={isLeftInView ? "visible" : "hidden"}
          >
            {/* Small tag */}
            <motion.div
              className="inline-flex items-center gap-2"
              variants={childVariants}
            ></motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
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

            {/* Vertical Bar Chart Card */}
            <motion.div
              className="bg-gray-900 text-white rounded-3xl p-8 w-full h-80 relative overflow-hidden"
              variants={childVariants}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.p
                className="text-sm text-gray-400 mb-1"
                variants={childVariants}
              >
                Rise in conversion
              </motion.p>
              <motion.p
                className="text-4xl font-bold mb-8"
                variants={childVariants}
              >
                +20%
              </motion.p>

              {/* Vertical Bar Chart */}
              <div className="flex items-end justify-center gap-4 h-32">
                {[
                  {
                    label: "Graphic",
                    percent: 20,
                    color: "bg-red-500",
                    height: "25%",
                  },
                  {
                    label: "Copywriting",
                    percent: 75,
                    color: "bg-sky-400",
                    height: "75%",
                  },
                  {
                    label: "Website",
                    percent: 40,
                    color: "bg-yellow-400",
                    height: "50%",
                  },
                  {
                    label: "UI / UX",
                    percent: 95,
                    color: "bg-emerald-400",
                    height: "95%",
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
                    <span className="text-xs text-gray-300 text-center leading-tight">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Slides in from right */}
          <motion.div
            ref={rightColumnRef}
            className="space-y-8"
            variants={rightSlideVariants}
            initial="hidden"
            animate={isRightInView ? "visible" : "hidden"}
          >
            {/* Text Content */}
            <motion.div className="space-y-6" variants={childVariants}>
              <motion.p
                className="text-lg md:text-[23px] md:mt-12  text-gray-900 leading-relaxed font-medium "
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

            {/* Team Image with Play Button - Same height as chart */}
            <motion.div
              className="relative rounded-3xl -mt-4 overflow-hidden cursor-pointer h-80"
              variants={childVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onClick={handlePlayClick}
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              }}
            >
              {!isPlaying ? (
                <>
                  {/* Team Image */}
                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Simulated team image with people */}
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center relative overflow-hidden">
                      {/* Mock people silhouettes */}
                      <div className="flex items-center justify-center gap-4 relative z-10">
                        {/* Person 1 */}
                        <div className="w-20 h-24 bg-black bg-opacity-30 rounded-full relative">
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black bg-opacity-40 rounded-full"></div>
                        </div>

                        {/* Person 2 (center) */}
                        <div className="w-24 h-28 bg-black bg-opacity-30 rounded-full relative">
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-black bg-opacity-40 rounded-full"></div>
                          {/* Glasses */}
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black bg-opacity-60 rounded-full"></div>
                        </div>

                        {/* Person 3 */}
                        <div className="w-20 h-24 bg-black bg-opacity-30 rounded-full relative">
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black bg-opacity-40 rounded-full"></div>
                        </div>
                      </div>

                      {/* Tablet/device */}
                      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-black bg-opacity-50 rounded-lg"></div>
                    </div>
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
                      style={{ width: "120px", height: "120px" }}
                    />

                    {/* Main Play Button */}
                    <motion.div
                      className="bg-white rounded-full p-6 shadow-lg relative z-10"
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
                        <Play className="w-10 h-10 text-red-500 fill-current" />
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
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                </>
              ) : (
                /* Actual Video Player */
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  src="/your-video.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
