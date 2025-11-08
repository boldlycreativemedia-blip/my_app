"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DigitalMarketingHeader from "../components/DigitalMarketingHeader";
import { ArrowRight } from "lucide-react";
import ServiceNumber from "../components/ServiceNumber";
import ServiceDigitalMarketing from "../components/ServiceDigitalMarketing";
import ServiceProjects from "../components/ServiceProjects";
import Link from "next/link";
import LastServiceSection from "../components/LastServiceSection";

const Page = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimized scroll animation with RAF
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isMounted) return;

    const scrollSpeed = 0.5; // Reduced speed for better performance
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      // Throttle to target FPS
      if (deltaTime >= frameTime) {
        if (!isHovered && !isDragging && scrollContainer) {
          const maxScroll = scrollContainer.scrollWidth / 2;

          scrollPositionRef.current += scrollSpeed;

          if (scrollPositionRef.current >= maxScroll) {
            scrollPositionRef.current = 0;
          }

          scrollContainer.scrollLeft = scrollPositionRef.current;
        }
        lastTime = currentTime - (deltaTime % frameTime);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging, isMounted]);

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
        className="relative z-10 bg-white w-full px-1 md:px-4 md:py-16 py-0 min-h-screen"
        ref={sectionRef}
      >
        <div className="max-w-[1920px] ml-4 mr-4 mx-auto px-4 sm:px-6 py-4 md:py-12">
          {/* Main Heading Section */}
          <div className="relative">
            {/* LEFT CONTENT - Main Heading */}
            <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold leading-tight sm:leading-none text-black mb-6 sm:mb-8 md:mb-12">
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
                      priority
                    />
                  </span>
                </span>
              </h1>

              {/* Background Text - "Your Growth" */}
              <div className="relative md:hidden -mt-4 pb-7">
                <div className="text-[#BBBBBB] md:text-[#BBBBBB] text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden whitespace-nowrap">
                  \\Amplify Your Voice
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full md:w-auto flex justify-center md:justify-start">
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
              </div>
            </div>

            {/* Stats positioned on the right */}
            <div className="hidden md:block absolute top-0 right-0 z-10">
              <div className="text-right">
                <div className="text-gray-600 text-lg leading-tight">
                  Let's Bring Your
                  <br />
                  Vision to life
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats - Only visible on mobile */}
          <div className="block md:hidden mt-8 text-center">
            <div className="text-gray-600 text-base sm:text-lg leading-tight">
              Let's create visuals
              that captivate and
              captivate
            </div>
          </div>

          {/* Background Text - "Your Growth" */}
          <div className="relative hidden md:block mt-8 sm:mt-12 md:-mt-24">
            <div className="text-[#BBBBBB] md:text-[#BBBBBB] text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden">
              \\Amplify Your Voice
            </div>
          </div>
        </div>

        <DigitalMarketingHeader />

        {/* Moving Brand Logos Section - Optimized */}
        <div className="bg-white relative overflow-hidden -mt-16">
          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-12 md:gap-16 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
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
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={brand.image}
                  alt={brand.alt}
                  width={120}
                  height={60}
                  className="h-30 md:h-36 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
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
        </div>
      </section>

      <ServiceNumber />
      <ServiceDigitalMarketing />
      <ServiceProjects />
      <LastServiceSection />
      <Footer />
    </div>
  );
};

export default Page;
