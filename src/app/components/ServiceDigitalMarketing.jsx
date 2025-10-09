import React, { useState, useEffect, useRef } from "react";
import { Target, Store, Zap, BarChart3, Flag } from "lucide-react";

const ServiceDigitalMarketing = () => {
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
      title: "Audience Connection:",
      description:
        "We dive deep to understand your audience, crafting emotionally resonant visuals and content that build genuine connection and loyalty.",
      icon: Target,
      animationDelay: 0.5,
    },
    {
      id: 2,
      title: "Bold Brand Identity:",
      description:
        "We define what makes your brand stand out, developing a powerful visual identity and unique voice that sets you apart from the competition.",
      icon: Store,
      animationDelay: 0.5,
    },
    {
      id: 3,
      title: "Creative Expertise:",
      description:
        "Our team stays at the forefront of design, video, and social media trends, leveraging our expertise to create innovative content that captivates.",
      icon: Zap,
      animationDelay: 0.7,
    },
    {
      id: 4,
      title: "Impactful Storytelling:",
      description:
        "We don't just create beautiful content; we ensure every story is strategic, measuring its impact to guarantee it delivers measurable results.",
      icon: BarChart3,
      animationDelay: 0.7,
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
                THE BOLDLY DIFFERENCE
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
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                We are a passionate team of creative storytellers dedicated to
                helping brands thrive in the digital world.{" "}
                <span className="text-gray-400">
                  With a deep understanding of the ever-evolving content
                  landscape, we combine bold ideas with flawless execution to
                  keep your brand at the forefront of its industry.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Goal Setting Section */}
        <div
          className={`bg-[#06D6A0] rounded-2xl p-8 mb-12 transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          }`}
          style={{ backgroundColor: "#06D6A0" }}
        >
          <div className="flex items-start space-x-6">
            <div
              className={`transition-all duration-500 delay-700 ${
                isVisible ? "rotate-0" : "rotate-12"
              }`}
            >
              <Flag className="w-10 h-10 text-gray-800" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Strategic Vision
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                CWe partner with you to clearly define your brand's unique story
                and creative goals, ensuring every project delivers on a
                powerful, cohesive vision.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-500 cursor-pointer ${
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

export default ServiceDigitalMarketing;
