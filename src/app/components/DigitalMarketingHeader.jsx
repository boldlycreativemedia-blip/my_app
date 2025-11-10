import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Link from "next/link";

const DigitalMarketingHeader = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  const services = [
    {
      id: 1,
      title: "Video Production Services",
      subtitle:
        "Brand & Corporate Videos / Advertising & Commercials / Social Media Content / Explainer & Educational Videos / Event Coverage & Live Production / Product & Service Videos / Documentary & Storytelling / Animation & Motion Graphics / Music & Entertainment / Offline/Traditional Media Videos",
      description:
        "Comprehensive video solutions for every platform, online and offline. From brand storytelling to TV commercials, we create engaging visual content that captures your audience's attention and drives results.",
      image: "/Video_Production_Services.jpg",
    },
    {
      id: 2,
      title: "Photography Services",
      subtitle:
        "Corporate & Executive Photography / Brand & Campaign Photography / Product & Luxury Photography / Event & Experience Photography / Portrait & Lifestyle Photography / Hospitality & Architectural Photography / Food & Beverage Photography / Industrial & Documentary for Business / Creative & Artistic Photography / Travel & Destination Photography",
      description:
        "High-end photography crafted for businesses, brands, and individuals. Professional imagery that elevates your brand presence across all mediums and platforms.",
      image: "/Photography_Services.png",
    },
    {
      id: 3,
      title: "Graphics & Design Services",
      subtitle:
        "Brand Identity & Visual Design / Marketing & Promotional Graphics / Social Media Graphics / Web & Digital Design / Motion & Animated Graphics / Product & Packaging Design / Presentation & Corporate Design / Event & Exhibition Graphics / Illustration & Custom Artwork / Print & Offline Collateral",
      description:
        "Creative designs that define brands across digital and print. From logo design to complete brand guidelines, we create visual identities that resonate with your target audience.",
      image: "/Graphics_&_Design_Services.JPG",
    },
    {
      id: 4,
      title: "Website Design & Development Services",
      subtitle:
        "Custom Website Design / Corporate & Business Websites / E-commerce Websites / Portfolio & Personal Branding Websites / Marketing & Campaign Websites / Blog & Content Websites / Website Redesign & Revamp / Web Animations & Interactive Design / Maintenance & Website Support / SEO & Website Optimization",
      description:
        "Creative, functional websites designed to elevate brands online. Responsive, user-friendly websites that convert visitors into customers and drive business growth.",
      image: "/Website_Design_&_Development_Services.png",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            // Element is entering viewport
            setVisibleSections((prev) => ({ ...prev, [index]: "visible" }));
          } else {
            // Element is leaving viewport
            const rect = entry.boundingClientRect;
            if (rect.top > 0) {
              // Element is below viewport (hasn't been seen yet)
              setVisibleSections((prev) => ({
                ...prev,
                [index]: "hidden-below",
              }));
            } else {
              // Element is above viewport (scrolled past)
              setVisibleSections((prev) => ({
                ...prev,
                [index]: "hidden-above",
              }));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getAnimationClasses = (index) => {
    const state = visibleSections[index];
    const isEven = index % 2 === 0;

    switch (state) {
      case "visible":
        return "opacity-100 translate-x-0";
      case "hidden-above":
        // Disappear in opposite direction
        return isEven
          ? "opacity-0 translate-x-20"
          : "opacity-0 -translate-x-20";
      case "hidden-below":
      default:
        // Initial state - hidden in entry direction
        return isEven
          ? "opacity-0 -translate-x-20"
          : "opacity-0 translate-x-20";
    }
  };

  const getLineWidth = (index) => {
    const state = visibleSections[index];
    return state === "visible" ? "w-full" : "w-0";
  };

  return (
    <div className="bg-white min-h-screen -mb-12">
      {/* Header Section */}
      <div className="max-w-[1920px] ml-4 mr-4 mx-auto bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1920px]">
          {/* Our Services Badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#EC4D37]"></div>
            <span className="text-[#1F1B1C] font-medium text-sm sm:text-base">
              Our Services
            </span>
          </div>

          <div className="flex flex-col  lg:flex-row items-start lg:items-baseline justify-between gap-8">
            {/* Main Heading */}
            <div className="flex-1 max-w-[1920px]">
              {/* Mobile: Single line */}
              <h1 className="lg:hidden max-w-[1920px] text-4xl sm:text-5xl font-bold text-[#1F1B1C] leading-tight">
                Innovative Services Crafted To Elevate Your Brand
              </h1>

              {/* Desktop: Split layout */}
              <div className="hidden lg:block">
                <h1 className="max-w-[1920px] text-7xl font-bold text-[#1F1B1C] leading-tight">
                  Innovative Services Crafted
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <h2 className="text-7xl font-bold text-[#1F1B1C] leading-tight">
                    To Elevate
                  </h2>
                  <h2 className="text-7xl font-bold text-[#1F1B1C] leading-tight mt-2">
                    Your Brand
                  </h2>
                </div>
              </div>
            </div>

            {/* CTA Button - Minimalist Style */}
            <Link href="/services">
              <div className="flex-shrink-0">
                <button className="group flex cursor-pointer items-baseline gap-2 border-b-2 border-[#1F1B1C] hover:border-[#EC4D37] transition-all duration-300">
                  <span className="text-[#1F1B1C] font-medium text-sm sm:text-base">
                    Learn More Our Service
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#1F1B1C] group-hover:text-[#EC4D37] group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1920px] ml-4 mr-4 mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              data-index={index}
              className="relative mb-8"
            >
              {/* Animated Line */}
              <div className="absolute left-0 top-0 w-full h-px bg-gray-50 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-out ${getLineWidth(
                    index
                  )}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                />
              </div>

              {/* Service Content */}
              <div
                className={`transition-all duration-800 ease-out transform ${getAnimationClasses(
                  index
                )}`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* All services - collapsible layout */}
                <div className=" rounded-2xl">
                  <div
                    className="flex items-start justify-between p-4 sm:p-8 cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => toggleSection(service.id)}
                  >
                    <div className="flex items-start gap-3 sm:gap-6 flex-1 min-w-0">
                      <span className="text-orange-500 font-bold text-lg sm:text-xl flex-shrink-0 pt-1">
                        0{service.id}
                      </span>
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#1F1B1C] break-words">
                        {service.title}
                      </h3>
                    </div>
                    <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors duration-200 flex-shrink-0 ml-2">
                      {expandedSections[service.id] ? (
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedSections[service.id]
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-8">
                      <div className="border-t border-gray-200 pt-6">
                        {expandedSections[service.id] && (
                          <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/5">
                              {/* Service categories as numbered list */}
                              {service.subtitle && (
                                <div className="space-y-2">
                                  {service.subtitle
                                    .split(" / ")
                                    .map((category, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-3"
                                      >
                                        <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                                          {idx + 1}
                                        </span>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                          {category}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                            <div className="lg:w-3/5">
                              {/* Service image */}
                              <div className="flex justify-start mb-6">
                                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                                  <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-gray-600 text-lg leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingHeader;
