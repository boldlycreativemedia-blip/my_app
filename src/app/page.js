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
import Link from "next/link";

// Animated Words Component for the bottom line
const AnimatedWords = () => {
  const words = ["Motion", "Cinematics", "Media", "Films", "Websites"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

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
  const [isMuted, setIsMuted] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const videoRef = useRef(null);

  // Font loading detection
  useEffect(() => {
    // Check if font is already loaded
    if (document.fonts && document.fonts.check("1em Thoge")) {
      setFontLoaded(true);
    } else {
      // Wait for font to load
      document.fonts.ready.then(() => {
        setFontLoaded(true);
      });

      // Fallback timeout in case font doesn't load
      const timeout = setTimeout(() => {
        setFontLoaded(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // progress [0..1] driven by wheel/touch
  const progress = useMotionValue(0);
  const isAnimatingRef = useRef(true);

  // visual transforms for the ANIMATION OVERLAY
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

  // --- Wheel handling with pause at video ---
  const sensitivityWheel = 0.0022;
  const pauseThreshold = 0.98; // Pause when animation is almost complete
  const isPausedAtVideo = useRef(false);

  function onWheel(e) {
    if (isAnimatingRef.current) {
      e.preventDefault();
      const delta = e.deltaY;
      const currentProgress = progress.get();
      let nextProgress;

      if (delta > 0) {
        // Scrolling down: fade animation out
        nextProgress = Math.min(1, currentProgress + delta * sensitivityWheel);

        // Check if we've reached the pause threshold
        if (
          currentProgress < pauseThreshold &&
          nextProgress >= pauseThreshold
        ) {
          nextProgress = pauseThreshold;
          isPausedAtVideo.current = true;

          // Auto-resume after 800ms pause
          setTimeout(() => {
            if (isPausedAtVideo.current) {
              isPausedAtVideo.current = false;
            }
          }, 800);
        } else if (isPausedAtVideo.current && nextProgress > pauseThreshold) {
          // Don't allow progression while paused
          nextProgress = pauseThreshold;
        }
      } else {
        // Scrolling up: fade animation back in
        isPausedAtVideo.current = false;
        nextProgress = Math.max(0, currentProgress + delta * sensitivityWheel);
      }

      progress.set(nextProgress);

      // Switch to normal scrolling when animation is fully faded
      if (nextProgress >= 1) {
        isPausedAtVideo.current = false;
        enableNormalScrolling();
      }
    } else {
      // Normal scrolling mode
      if (window.scrollY === 0 && e.deltaY < 0) {
        e.preventDefault();
        enableAnimationMode();
        progress.set(0.95);
      }
    }
  }

  // --- Touch handling with pause ---
  const touchStartY = useRef(0);
  const sensitivityTouch = 0.0035;

  function onTouchStart(e) {
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    if (isAnimatingRef.current) {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      const currentProgress = progress.get();
      let nextProgress;

      if (delta > 0) {
        // Swiping up: fade animation out
        nextProgress = Math.min(1, currentProgress + delta * sensitivityTouch);

        // Check if we've reached the pause threshold
        if (
          currentProgress < pauseThreshold &&
          nextProgress >= pauseThreshold
        ) {
          nextProgress = pauseThreshold;
          isPausedAtVideo.current = true;

          setTimeout(() => {
            if (isPausedAtVideo.current) {
              isPausedAtVideo.current = false;
            }
          }, 800);
        } else if (isPausedAtVideo.current && nextProgress > pauseThreshold) {
          nextProgress = pauseThreshold;
        }
      } else {
        // Swiping down: fade animation back in
        isPausedAtVideo.current = false;
        nextProgress = Math.max(0, currentProgress + delta * sensitivityTouch);
      }

      progress.set(nextProgress);
      touchStartY.current = currentY;

      if (nextProgress >= 1) {
        isPausedAtVideo.current = false;
        enableNormalScrolling();
      }
    } else {
      if (window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        const delta = touchStartY.current - currentY;

        if (delta < 0) {
          e.preventDefault();
          enableAnimationMode();
          progress.set(0.95);
        }
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Font Loading with preload and optimizations */}
      <style jsx global>{`
        @font-face {
          font-family: "Thoge";
          src: url("/fonts/Thoge.woff") format("woff"),
            url("/fonts/Thoge.otf") format("opentype"),
            url("/fonts/Thoge.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: block; /* Prevents FOUT (Flash of Unstyled Text) */
        }

        .thoge-font {
          font-family: "Thoge", "Impact", "Arial Black", sans-serif;
          font-weight: normal;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }

        /* Loading screen */
        .font-loading-overlay {
          position: fixed;
          inset: 0;
          background: #ec4d37;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease-out;
        }

        .font-loading-overlay.loaded {
          opacity: 0;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          .thoge-font {
            font-feature-settings: "kern" 1;
          }
        }
      `}</style>

      {/* Font Loading Overlay */}
      <div className={`font-loading-overlay ${fontLoaded ? "loaded" : ""}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1F1B1C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#1F1B1C] mt-4 text-lg font-semibold">
            Loading...
          </p>
        </div>
      </div>

      <main
        className={`relative overflow-hidden transition-opacity duration-300 ${
          fontLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Fixed header */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* ANIMATION OVERLAY */}
        <motion.div
          className="fixed inset-0 z-40 bg-[#EC4D37] flex items-center justify-center px-20 pointer-events-none"
          style={{
            scale,
            opacity,
            transformOrigin: "50% 50%",
          }}
        >
          <div className="text-center">
            <h1 className="text-[#1F1B1C] lg:w-[438.32px] lg:h-[380.59px] leading-tight text-center lg:mt-12 sm:-mt-24 thoge-font">
              <span className="text-9xl md:text-9xl lg:text-[250px]">
                BOLDLY
              </span>
              <br />
              <span className="text-9xl md:text-9xl lg:text-[200px]">
                CREATIVE
              </span>
              <br />
              <span className="text-6xl md:w-114 md:h-46 lg:w-114 lg:h-46">
                <AnimatedWords />
              </span>
            </h1>

            <Link href="/contactus">
              <button className="mt-40 bg-[#1F1B1C] cursor-pointer text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#2a2526] transition-all duration-300 flex items-center gap-3 mx-auto pointer-events-auto">
                Start your journey
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* VIDEO SECTION */}
        <section className="h-screen relative z-10 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/BOLDLY_CREATIVE_MEDIA.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-8 right-8 z-20 bg-[#1F1B1C] text-white p-4 rounded-full transition-all duration-300"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5L6 9H2V15H6L11 19V5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="23"
                  y1="9"
                  x2="17"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="17"
                  y1="9"
                  x2="23"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5L6 9H2V15H6L11 19V5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <Link href="/contactus">
            <div className="relative z-10 h-full flex items-end justify-center pb-20">
              <div className="text-white text-center">
                <button className="mt-40 bg-[#EC4D37] cursor-pointer text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#ea4b36] transition-all duration-300 flex items-center gap-3 mx-auto pointer-events-auto">
                  Start your journey
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        </section>

        {/* REST OF CONTENT */}
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
