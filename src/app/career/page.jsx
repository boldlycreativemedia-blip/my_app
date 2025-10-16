"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CareerOptions from "../components/CareerOptions";
import Opportunity from "../components/Opportunity";
import LastAboutSection from "../components/LastAboutSection";
import Link from "next/link";

const page = () => {
  const sectionRef = useRef(null);

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
            {/* Desktop: Two column layout, Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
              {/* LEFT CONTENT - Main Heading */}
              <motion.div
                className="lg:col-span-8 order-2 lg:order-1"
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
                  Explore Existing
                  <br />
                  <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                    Career
                    <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#EC4D37] rounded-full flex-shrink-0">
                      <Image
                        src="/draw.png"
                        alt="draw"
                        width={20}
                        height={20}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                      />
                    </span>
                    Opportunities
                  </span>
                </motion.h1>

                {/* CTA Button */}
                <Link href="contactus">
                <motion.button
                  className="group bg-[#EC4D37] cursor-pointer text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 sm:gap-3 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start mt-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Open Roles
                  <motion.div
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black cursor-pointer" />
                  </motion.div>
                </motion.button>
                </Link>
              </motion.div>

              {/* RIGHT CONTENT - New Heading (Top Right on Desktop) */}
              <motion.div
                className="lg:col-span-4 order-1 lg:order-2 flex items-start justify-start lg:justify-end lg:pt-0"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                <motion.h2
                  className="text-md sm:text-lg md:text-xl font-bold leading-tight text-gray-500 text-left lg:text-right"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Let's build a 
                  <br />
                  future where 
                  <br />
                  Creativity thrives
                </motion.h2>
              </motion.div>
            </div>
          </div>

          {/* Background Text - "Work With Us" */}
          <motion.div
            className="relative mt-8 sm:mt-12 md:mt-16 lg:-mt-24"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <motion.div
              className="text-gray-300 md:text-gray-400 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              \\Work With Us
            </motion.div>
          </motion.div>
        </div>
      </section>
      <CareerOptions />
      <Opportunity />
      <LastAboutSection />
      <Footer />
    </div>
  );
};

export default page;
