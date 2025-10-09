"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Header from "./components/Header";
import AnimatedContentSection from "./components/AnimatedContentSection";
import DigitalMarketingHeader from "./components/DigitalMarketingHeader";
import Testimonials from "./components/Testimonials";
import CreativeTeamSection from "./components/CreativeTeamSection";
import AnimatedStatsCounter from "./components/AnimatedStatsCounter";
import DigitalMarketingFAQs from "./components/DigitalMarketingFAQs";
import LastHomeSection from "./components/LastHomeSection";
import Footer from "./components/Footer";
import ProcessSection from "./components/ProcessSection";

// Animated Words Component for the bottom line
const AnimatedWords = () => {
  const words = ["Motion","Cinematics","Media","Films","Websites"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentIndex]}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex justify-center items-center"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // progress [0..1] driven by wheel/touch
  const progress = useMotionValue(0);
  const isAnimatingRef = useRef(true); // tracks if we're in animation mode

  // visual transforms for the ANIMATION OVERLAY (scale & opacity)
  const scaleRaw = useTransform(progress, [0, 1], [1, 3.5]);
  const opacityRaw = useTransform(progress, [0, 1], [1, 0]);
  const scale = useSpring(scaleRaw, { stiffness: 90, damping: 25 });
  const opacity = useSpring(opacityRaw, { stiffness: 90, damping: 25 });

  // switch to normal scrolling mode
  const enableNormalScrolling = () => {
    if (!isAnimatingRef.current) return;
    isAnimatingRef.current = false;
    document.body.style.overflow = "";
  };

  // switch back to animation mode
  const enableAnimationMode = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  // --- Wheel handling ---
  const sensitivityWheel = 0.0022;
  function onWheel(e) {
    if (isAnimatingRef.current) {
      // Animation mode: control animation overlay
      e.preventDefault();
      const delta = e.deltaY;
      const currentProgress = progress.get();
      let nextProgress;

      if (delta > 0) {
        // Scrolling down: fade animation out (reveal website)
        nextProgress = Math.min(1, currentProgress + delta * sensitivityWheel);
      } else {
        // Scrolling up: fade animation back in (hide website)
        nextProgress = Math.max(0, currentProgress + delta * sensitivityWheel);
      }

      progress.set(nextProgress);

      // Switch to normal scrolling when animation is fully faded
      if (nextProgress >= 1) {
        enableNormalScrolling();
      }
    } else {
      // Normal scrolling mode: check if we should return to animation
      if (window.scrollY === 0 && e.deltaY < 0) {
        // At top of page and trying to scroll up further
        e.preventDefault();
        enableAnimationMode();
        progress.set(0.95); // Start slightly faded so user sees the transition
      }
    }
  }

  // --- Touch handling ---
  const touchStartY = useRef(0);
  const sensitivityTouch = 0.0035;

  function onTouchStart(e) {
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    if (isAnimatingRef.current) {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY; // positive when swiping up
      const currentProgress = progress.get();
      let nextProgress;

      if (delta > 0) {
        // Swiping up: fade animation out
        nextProgress = Math.min(1, currentProgress + delta * sensitivityTouch);
      } else {
        // Swiping down: fade animation back in
        nextProgress = Math.max(0, currentProgress + delta * sensitivityTouch);
      }

      progress.set(nextProgress);
      touchStartY.current = currentY;

      if (nextProgress >= 1) {
        enableNormalScrolling();
      }
    } else {
      // Normal scrolling mode: check if we should return to animation
      if (window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        const delta = touchStartY.current - currentY;

        if (delta < 0) {
          // Swiping down at top of page
          e.preventDefault();
          enableAnimationMode();
          progress.set(0.95);
        }
      }
    }
  }

  // Add event listeners on mount
  useEffect(() => {
    // Start in animation mode
    document.body.style.overflow = "hidden";

    // Add event listeners
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      // Cleanup
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Thoge Font Loading - Exact font files you have */}
      <style jsx global>{`
        @font-face {
          font-family: "Thoge";
          src: url("/fonts/Thoge.woff") format("woff"),
            url("/fonts/Thoge.otf") format("opentype"),
            url("/fonts/Thoge.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .thoge-font {
          font-family: "Thoge", "Impact", "Arial Black", sans-serif;
          font-weight: normal;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }

        /* Preload font for better performance */
        @media (prefers-reduced-motion: no-preference) {
          .thoge-font {
            font-feature-settings: "kern" 1;
          }
        }
      `}</style>

      <main className="relative overflow-hidden">
        {/* Fixed header always on top */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* ANIMATION OVERLAY with Thoge Font */}
        <motion.div
          className="fixed inset-0 z-40 bg-[#EC4D37] flex items-center justify-center px-6 pointer-events-none"
          style={{
            scale,
            opacity,
            transformOrigin: "50% 50%",
          }}
        >
          <div className="text-center">
            <h1 className="text-white lg:w-[438.32px] lg:h-[394.59px] leading-tight text-center lg:-mt-9 sm:-mt-24 thoge-font">
              <span className=" text-9xl md:text-9xl lg:text-[250px]">BOLDLY</span><br/> <span className=" text-9xl md:text-9xl lg:text-[200px]">CREATIVE</span>
              <br />
              <span className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl"><AnimatedWords /></span>
            </h1>
          </div>
        </motion.div>

        {/* ACTUAL WEBSITE STARTS HERE */}

        {/* VIDEO SECTION - First section of your real website */}
        <section className="h-screen relative z-10 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/home_video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Optional overlay content on video */}
          <div className="relative z-10 h-full flex items-end justify-center pb-20">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to Boldly Creative
              </h2>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION - Rest of your website */}
        <AnimatedContentSection
          isAnimatingRef={isAnimatingRef}
          handlePlayClick={handlePlayClick}
          isPlaying={isPlaying}
        />
        <ProcessSection />
        <DigitalMarketingHeader />
        <AnimatedStatsCounter />
        <Testimonials />
        <CreativeTeamSection />
        <DigitalMarketingFAQs />
        <LastHomeSection />
        <Footer />
      </main>
    </>
  );
}
