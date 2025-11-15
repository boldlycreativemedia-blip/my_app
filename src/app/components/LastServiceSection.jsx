"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const LastServiceSection = () => {
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
    { image: "/Brand-8.png", alt: "Brand 8" },
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
    <div className="bg-white -mt-30">
      <div className="min-h-screen bg-white flex items-center justify-center p-[34px] md:p-[48px] -mb-30 pb-0">
        <div className="relative w-full max-w-[1920px] bg-[#EC4D37] rounded-3xl overflow-hidden">
          {/* Main Content Container */}
          <div className="relative z-10 px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
            <div className="max-w-2xl">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Ready to transform
                <br />
                your digital presence?
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-white/90 mb-8 font-medium">
                Let us transform your digital business in just a month.
              </p>

              {/* CTA Button */}
              <Link href="/contactus">
                <button className="bg-white text-gray-900 px-8 cursor-pointer py-4 rounded-full font-semibold text-sm md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get Free Consultation
                </button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          {/* Top Right Star */}
          <div className="absolute top-0 right-0 w-18 h-18 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48">
            <img
              src="/Frame2085660656.png"
              alt="Decorative star"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Bottom Right Geometric Shape */}
          <div className="absolute -bottom-2 md:-bottom-10 right-14 sm:right-40 w-20 h-20 sm:w-32 sm:h-32 md:w-64 md:h-64">
            <img
              src="/Frame2085660655.png"
              alt="Decorative shape"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      <motion.div
        className=" ml-10 mr-10 bg-white relative overflow-hidden"
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
                className={`${
                  brand.image === "/Brand-8.png"
                    ? "h-10 sm:h-14 md:h-16 lg:h-20" // Custom height for Brand-8
                    : "h-20 sm:h-24 md:h-30 lg:h-36" // Default height for others
                } w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300`}
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
    </div>
  );
};

export default LastServiceSection;
