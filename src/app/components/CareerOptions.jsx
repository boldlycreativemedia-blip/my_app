import React, { useState, useEffect, useRef } from "react";
import { Target, Store, Zap, BarChart3, Flag } from "lucide-react";

const CareerOptions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "Career Growth:",
      description:
        "Pursue your passion through continuous learning, mentorship, and opportunities for professional advancement.",
      icon: Target,
      animationDelay: 0.8,
    },
    {
      id: 2,
      title: "Great Culture:",
      description:
        "Join a vibrant, supportive team that celebrates original ideas, creative expression, and open collaboration.",
      icon: Store,
      animationDelay: 0.8,
    },
    {
      id: 3,
      title: "Flexible Hours:",
      description:
        "Enjoy the freedom to balance work and life with our flexible scheduling and remote work options.",
      icon: Zap,
      animationDelay: 1.5,
    },
    {
      id: 4,
      title: "Competitive Salary:",
      description:
        "We reward exceptional talent with a comprehensive benefits package and a competitive salary that reflects your passion and skills.",
      icon: BarChart3,
      animationDelay: 1.5,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full bg-white py-16 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Main Heading */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Who We're Looking For?
              </h1>
            </div>

            {/* Right Column - Description */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                We are a passionate team of creative minds and strategic
                thinkers, dedicated to crafting unforgettable brand stories.{" "}
                <span className="text-gray-400">
                  We believe in the power of collaboration and are looking for
                  bold, innovative talent ready to push boundaries and grow with
                  us.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group p-6 rounded-xl bg-amber-50 border border-gray-200 hover:shadow-lg transition-all duration-500 cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-x-0 scale-100"
                  : `opacity-0 ${
                      index % 2 === 0 ? "-translate-x-20" : "translate-x-20"
                    } scale-95`
              } hover:scale-105 hover:bg-white`}
              style={{
                transitionDelay: `${service.animationDelay}s`,
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="transition-all duration-300 group-hover:rotate-12">
                  <service.icon className="w-8 h-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerOptions;
