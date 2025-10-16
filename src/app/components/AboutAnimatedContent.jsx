"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Lightbulb } from "lucide-react";

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
    <section
      className="relative z-10 bg-gray-50 w-full px-6 md:px-12 py-8 min-h-screen"
      ref={sectionRef}
    >
      <div className="max-w-max">
        {/* Main Content Container */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 sm:py-20">
          {/* Main Heading Section - Changed to animate immediately */}
          <div className="relative">
            <motion.div
              className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-6xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-none text-black mb-6 sm:mb-8 md:mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Know More
                <br />
                <span className="flex flex-wrap items-center gap-2 mt-3 sm:gap-3 md:gap-4 lg:gap-8">
                  About Boldly
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#EC4D37] rounded-full flex-shrink-0">
                    <Lightbulb
                      strokeWidth={4}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    />
                  </span>
                  Creative
                </span>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block"
              >
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
              </motion.div>
            </motion.div>
          </div>

          {/* Background Text - Changed to animate immediately */}
          <motion.div
            className="relative mt-8 sm:mt-12 md:-mt-24"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="text-gray-300 md:text-gray-400 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-center md:text-right overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
          transition={{ duration: 0.9 }}
        >
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

          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>

        {/* Two-column layout with scroll animations */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-20">
          {/* LEFT COLUMN */}
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
              <div className="absolute -top-1 -right-2">
                <img
                  src="/Frame2085660656.png"
                  alt="Decorative element"
                  className="w-16 h-16 md:w-34 md:h-34 opacity-90"
                />
              </div>

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

              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full" />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
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
              <div className="absolute -top-1 -right-2">
                <img
                  src="/Frame2085660656.png"
                  alt="Decorative element"
                  className="w-16 h-16 md:w-34 md:h-34 opacity-90"
                />
              </div>

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

              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
