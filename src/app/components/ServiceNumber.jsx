import React, { useState, useEffect, useRef } from "react";

const ServiceNumber = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 1,
      number: 50,
      suffix: "M +",
      label: "Eyes on our edits — and counting.",
      duration: 2000,
    },
    {
      id: 2,
      number: 90,
      suffix: "%",
      label: "Clients who keep coming back for more.",
      duration: 2000,
    },
    {
      id: 3,
      number: 200,
      suffix: "+",
      label: "Collabs that made it to the spotlight.",
      duration: 2000,
    },
    {
      id: 4,
      number: 100,
      suffix: "%",
      label: "Deadlines met. Vibes unmatched.",
      duration: 1000,
    },
  ];

  // Intersection Observer to trigger animation when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation hook
  const useCountUp = (end, duration, shouldStart) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldStart) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = end * easeOutQuart;

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
  };

  const StatItem = ({ stat, index, isLast }) => {
    const count = useCountUp(stat.number, stat.duration, isVisible);

    const formatNumber = (num) => {
      if (stat.number >= 1 && stat.number < 10) {
        return num.toFixed(1); // For 1.5M case
      }
      return Math.floor(num); // For whole numbers
    };

    return (
      <div className="flex items-center">
        {/* Stat Item */}
        <div
          className="text-center animate-fadeInUp flex-1"
          style={{
            animationDelay: `${index * 0.2}s`,
            animationFillMode: "both",
          }}
        >
          {/* Large Number with Animation */}
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 font-mono">
            <span>
              {stat.prefix && stat.prefix}
              {formatNumber(count)}
              {stat.suffix && stat.suffix}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
            {stat.label}
          </p>
        </div>

        {/* Vertical Divider - Only show if not the last item */}
        {!isLast && (
          <div
            className="animate-fadeInUp mx-4 md:mx-6 lg:mx-8"
            style={{
              animationDelay: `${(index + 0.5) * 0.2}s`,
              animationFillMode: "both",
            }}
          >
            <div className="w-px bg-gray-300 h-16 md:h-20 lg:h-24"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What have we achieved so far?
          </h2>

          {/* Description */}
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

        {/* Stats Section */}
        {/* Desktop Layout - All in one row with dividers */}
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

        {/* Mobile/Tablet Layout - Horizontal scrollable row */}
        <div className="lg:hidden overflow-x-auto pb-4">
          <div className="flex gap-8 min-w-max px-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="text-center animate-fadeInUp min-w-[200px]"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Large Number with Animation */}
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-mono">
                  <span>
                    {stat.prefix && stat.prefix}
                    {useCountUp(stat.number, stat.duration, isVisible).toFixed(
                      stat.number >= 1 && stat.number < 10 ? 1 : 0
                    )}
                    {stat.suffix && stat.suffix}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-[200px] mx-auto">
                  {stat.label}
                </p>
              </div>
            ))}
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
    </div>
  );
};

export default ServiceNumber;
