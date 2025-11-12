import React, { useState, useEffect, useRef } from "react";

const ServiceNumber = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 1,
      number: 50,
      suffix: "M+",
      label: "Views and counting",
      duration: 3000,
    },
    {
      id: 2,
      number: 90,
      suffix: "%",
      label: "Clients return",
      duration: 3000,
    },
    {
      id: 3,
      number: 200,
      suffix: "+",
      label: "Standout collabs.",
      duration: 3000,
    },
    {
      id: 4,
      number: 100,
      suffix: "%",
      label: " Deadlines nailed.",
      duration: 2000,
    },
  ];

  // Intersection Observer to trigger animation when component is visible
  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Counter animation hook
  const useCountUp = (end, duration, shouldStart) => {
    const [count, setCount] = useState(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (!shouldStart) {
        setCount(0);
        return;
      }

      setCount(0);

      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = end * easeOutQuart;

        setCount(currentCount);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }, [end, duration, shouldStart]);

    return count;
  };

  const StatItem = ({ stat, index, isLast }) => {
    const count = useCountUp(stat.number, stat.duration, isVisible);

    const formatNumber = (num) => {
      if (stat.number >= 1 && stat.number < 10) {
        return num.toFixed(1);
      }
      return Math.floor(num);
    };

    return (
      <>
        <div
          className={`text-center flex-1 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 font-mono">
            <span>
              {stat.prefix && stat.prefix}
              {formatNumber(count)}
              {stat.suffix && stat.suffix}
            </span>
          </div>

          <p className="text-gray-600 font-medium sm:font-extrabold text-sm md:text-base leading-relaxed max-w-xs mx-auto">
            {stat.label}
          </p>
        </div>

        {!isLast && (
          <div
            className={`mx-8 md:mx-12 lg:mx-16 flex items-center transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-px bg-gray-300 h-16 md:h-20 lg:h-24"></div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div ref={sectionRef} className="w-full bg-[#F8F8F8] py-5 px-4">
        <div className="max-w-[1920px] ml-4 mr-4 mx-auto">
          <div className="flex items-center justify-center gap-2 ">
            <div className="w-2 h-2 rounded-full bg-[#EC4D37]"></div>
            <span className="text-[#1F1B1C] font-medium text-sm sm:text-base">
              Impact
            </span>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What have we achieved so far?
            </h2>

            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-2">
                Lorem ipsum dolor sit amet consectetur. Nam aliquam aliquam diam
                et neque donec. Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Nam aliquam aliquam diam et neque donec.
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.id}
                stat={stat}
                index={index}
                isLast={index === stats.length - 1}
              />
            ))}
          </div>

          {/* Mobile/Tablet Layout - Fixed spacing */}
          <div className="lg:hidden flex items-center justify-between gap-1 sm:gap-2 px-1">
            {stats.map((stat, index) => {
              const count = useCountUp(stat.number, stat.duration, isVisible);
              const formatNumber = (num) => {
                if (stat.number >= 1 && stat.number < 10) {
                  return num.toFixed(1);
                }
                return Math.floor(num);
              };

              return (
                <React.Fragment key={stat.id}>
                  <div
                    className={`text-center flex-1 transition-opacity duration-500 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 font-mono whitespace-nowrap">
                      <span>
                        {stat.prefix && stat.prefix}
                        {formatNumber(count)}
                        {stat.suffix && stat.suffix}
                      </span>
                    </div>

                    <p className="text-gray-600 text-[10px] sm:text-xs leading-tight px-1">
                      {stat.label}
                    </p>
                  </div>

                  {index !== stats.length - 1 && (
                    <div
                      className={`flex-shrink-0 transition-opacity duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="w-px bg-gray-300 h-10 sm:h-12 md:h-16"></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default ServiceNumber;