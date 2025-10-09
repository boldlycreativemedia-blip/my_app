"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DigitalMarketingHeader from "../components/DigitalMarketingHeader";
import LastAboutSection from "../components/LastAboutSection";
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
  ArrowRight,
} from "lucide-react";
import ServiceNumber from "../components/ServiceNumber";
import ServiceDigitalMarketing from "../components/ServiceDigitalMarketing";
import ServiceProjects from "../components/ServiceProjects";

const page = () => {
  const sectionRef = useRef(null);
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
    <div>
      <Header />
      <section
        className="relative z-10 bg-gray-100 w-full px-6 md:px-12 py-20 min-h-screen"
        ref={sectionRef}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 sm:py-16">
          {/* Main Heading Section */}
          <div className="relative">
            {/* LEFT CONTENT - Main Heading */}
            <motion.div
              className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
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
                Explore Our
                <br />
                <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  Capabilities
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-500 rounded-full flex-shrink-0">
                    <Image
                      src="/draw.png"
                      alt="draw"
                      width={20}
                      height={20}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    />
                  </span>
                </span>
              </motion.h1>

              {/* CTA Button */}
              <motion.button
                className="group bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 sm:gap-3 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start mt-6"
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
                <div className="text-gray-600 text-lg leading-tight">
                  Let's Bring Your
                  <br />
                  Vision to life 
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
            <div className="text-gray-600 text-base sm:text-lg leading-tight">
              Let's create visuals
              <br />
              that captivate and <br />
              captivate
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
              className="text-gray-300 md:text-gray-400 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              \\Amplify Your Voice
            </motion.div>
          </motion.div>
        </div>
        <DigitalMarketingHeader />
        {/* Moving Brand Logos Section */}
        <motion.div
          className="py-12 bg-gray-100 relative overflow-hidden"
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
      </section>
      <ServiceNumber />
      <ServiceDigitalMarketing />
      <ServiceProjects />
      <LastAboutSection />
      <Footer />
    </div>
  );
};

export default page;
