"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const LastHomeSection = () => {
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
    <div className="bg-gray-100">
      <motion.div
        className="py-12 max-w-7xl mx-auto bg-gray-100 relative overflow-hidden"
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

      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-[#EC4D37] rounded-3xl overflow-hidden">
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
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Free Consultation
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          {/* Top Right Star */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
            <img
              src="/Frame2085660656.png"
              alt="Decorative star"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Bottom Right Geometric Shape */}
          <div className="absolute -bottom-10 right-60 w-48 h-48 md:w-64 md:h-64">
            <img
              src="/Frame2085660655.png"
              alt="Decorative shape"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute top-3/4 left-1/3 w-16 h-16 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastHomeSection;
