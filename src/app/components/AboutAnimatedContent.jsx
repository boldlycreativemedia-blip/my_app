"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutAnimatedContent() {
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
    if (!scrollContainer || isHovered || isDragging) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth / 2; // Half because we duplicated the array

    let scrollPosition = 0; // Start at the beginning
    const scrollSpeed = 1; // Pixels per frame

    const animate = () => {
      if (!isHovered && !isDragging) {
        scrollPosition += scrollSpeed; // Move right (scrolling left visually)

        // Reset to beginning for seamless loop
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
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
      className="relative z-10 bg-gray-50 w-full px-6 md:px-12 py-8 min-h-screen"
      ref={sectionRef}
    >
      <div className="max-w-max">
        {/* Main Content Container */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 sm:py-20">
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-none text-black mb-6 sm:mb-8 md:mb-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Know More
                <br />
                <span className="flex flex-wrap items-center gap-2 mt-3 sm:gap-3 md:gap-4 lg:gap-8">
                  About Boldly
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-500 rounded-full flex-shrink-0">
                    <Lightbulb
                      strokeWidth={4}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    />
                  </span>
                  Creative
                </span>
              </motion.h1>

              {/* CTA Button */}
              <motion.button
                className="group bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-5 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 sm:gap-3 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
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
          </div>

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
              \\Who We Are
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
                key={`brand-${index}`}
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 px-4 py-2 group"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={brand.image}
                  alt={brand.alt}
                  width={120}
                  height={60}
                  className="h-12 md:h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
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
            className="space-y-6"
            variants={leftSlideVariants}
            initial="hidden"
            animate={isLeftInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={childVariants}
            >
              The Creative Minds
              <br />
              Behind your brand's <br />
              Most Powerful <br />
              Digital presence
            </motion.h2>

            <motion.div
              className="relative -mt-3 rounded-2xl overflow-hidden bg-[#06D6A0] cursor-pointer p-8"
              variants={childVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Background Decorative Elements */}
              <div className="absolute -top-1 -right-2">
                <img
                  src="/Frame2085660656.png"
                  alt="Decorative element"
                  className="w-16 h-16 md:w-34 md:h-34 opacity-90"
                />
              </div>

              {/* Sparkle decoration */}
              <div className="absolute top-6 right-20">
                <motion.div
                  className="w-4 h-4 bg-white opacity-60"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Icon Circle */}
              <motion.div
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-black mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our Mission
                </motion.h3>

                <motion.p
                  className="text-black text-base md:text-md leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  At BOLDLY CREATIVE MEDIA, our mission is to provide strategic
                  and visually stunning creative solutions that build powerful
                  brands. We are a full-service content studio dedicated to
                  empowering your business through bold digital storytelling.
                  Our expertise in brand identity, website design, video
                  production, and graphic design helps transform your ideas into
                  tangible, high-impact results. Driven by a passion for
                  excellence, we're here to challenge conventions and help your
                  brand not just exist, but thrive. We don't just create
                  content; we build legacies.
                </motion.p>
              </div>

              {/* Large White Circle Decoration - Top Right */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-20 rounded-full" />

              {/* Small White Circle Decoration - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full" />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Slides in from right */}
          <motion.div
            ref={rightColumnRef}
            className="space-y-6"
            variants={rightSlideVariants}
            initial="hidden"
            animate={isRightInView ? "visible" : "hidden"}
          >
            <motion.p
              className="text-lg md:text-[18.85px] text-gray-700 leading-relaxed"
              variants={childVariants}
            >
              At Boldly Creative Media, we believe every brand has a unique
              story to tell. We're a team of creative and strategic minds
              dedicated to bringing those stories to life through compelling
              digital content.
              <motion.span
                className="text-gray-500 block mt-3"
                variants={childVariants}
              >
                From stunning video and photography to a seamless online
                presence with custom website design and engaging social media,
                we're here to help you connect with your audience. We're more
                than just a creative agency—we're your partners in building a
                brand that captivates and grows. Let's work together to make
                your brand impossible to ignore.
              </motion.span>
            </motion.p>

            <motion.div
              className="relative rounded-2xl overflow-hidden bg-[#06D6A0] cursor-pointer p-8"
              variants={childVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Background Decorative Elements */}
              <div className="absolute -top-1 -right-2">
                <img
                  src="/Frame2085660656.png"
                  alt="Decorative element"
                  className="w-16 h-16 md:w-34 md:h-34 opacity-90"
                />
              </div>

              {/* Sparkle decoration */}
              <div className="absolute top-6 right-20">
                <motion.div
                  className="w-4 h-4 bg-white opacity-60"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Icon Circle */}
              <motion.div
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-black mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our Vision
                </motion.h3>

                <motion.p
                  className="text-black text-base md:text-md leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  We believe stories aren't just told—they're felt. As a leading
                  creative agency and full-service content studio, our vision is
                  to transform the way brands connect with people. We're a team
                  dedicated to providing compelling digital solutions that go
                  beyond aesthetics, making your brand impossible to ignore. We
                  see our creative solutions as the bridge that connects your
                  brand identity with your audience. Through strategic video
                  production, powerful website design, and engaging social media
                  content, we turn messages into emotions and ideas into
                  unforgettable moments.
                </motion.p>
              </div>

              {/* Large White Circle Decoration - Top Right */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-20 rounded-full" />

              {/* Small White Circle Decoration - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
