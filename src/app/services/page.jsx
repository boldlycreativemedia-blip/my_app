"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DigitalMarketingHeader from "../components/DigitalMarketingHeader";
import LastAboutSection from "../components/LastAboutSection";
import { ArrowRight } from "lucide-react";
import ServiceNumber from "../components/ServiceNumber";
import ServiceDigitalMarketing from "../components/ServiceDigitalMarketing";
import ServiceProjects from "../components/ServiceProjects";
import Link from "next/link";

const page = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollPositionRef = useRef(0);
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

  const duplicatedBrands = [...brands, ...brands];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1;

    const animate = () => {
      if (!isHovered && !isDragging && scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth / 2;

        scrollPositionRef.current += scrollSpeed;

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
  }, [isHovered, isDragging]);

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollPositionRef.current = scrollContainer.scrollLeft;

    const maxScroll = scrollContainer.scrollWidth / 2;

    if (scrollContainer.scrollLeft >= maxScroll - 10) {
      scrollContainer.scrollLeft = 0;
      scrollPositionRef.current = 0;
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
            {/* LEFT CONTENT - Main Heading - FIXED: Removed viewport trigger and set immediate animation */}
            <motion.div
              className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-bold leading-tight sm:leading-none text-black mb-6 sm:mb-8 md:mb-12"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Explore Our
                <br />
                <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  Capabilities
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#EC4D37] rounded-full flex-shrink-0">
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
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <Link href="/contactus" className="inline-block">
                  <motion.div
                    className="group bg-[#EC4D37] hover:bg-[#e74b36] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 cursor-pointer relative z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Free Consultation
                    <motion.span
                      className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full inline-flex items-center justify-center"
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
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats positioned on the right */}
            <motion.div
              className="hidden md:block absolute top-0 right-0 z-10"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="text-gray-300 md:text-gray-400 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              \\Amplify Your Voice
            </motion.div>
          </motion.div>
        </div>
        <DigitalMarketingHeader />
        {/* Moving Brand Logos Section */}
        <motion.div
          className=" bg-gray-100 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-12 md:gap-16 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
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
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 px-4 py-2 group"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={brand.image}
                  alt={brand.alt}
                  width={120}
                  height={60}
                  className="h-40 md:h-46 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
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
