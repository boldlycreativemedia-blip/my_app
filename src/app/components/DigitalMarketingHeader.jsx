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
      image: "🎬",
    },
    {
      id: 2,
      title: "Photography Services",
      subtitle:
        "Corporate & Executive Photography / Brand & Campaign Photography / Product & Luxury Photography / Event & Experience Photography / Portrait & Lifestyle Photography / Hospitality & Architectural Photography / Food & Beverage Photography / Industrial & Documentary for Business / Creative & Artistic Photography / Travel & Destination Photography",
      description:
        "High-end photography crafted for businesses, brands, and individuals. Professional imagery that elevates your brand presence across all mediums and platforms.",
      image: "📸",
    },
    {
      id: 3,
      title: "Graphics & Design Services",
      subtitle:
        "Brand Identity & Visual Design / Marketing & Promotional Graphics / Social Media Graphics / Web & Digital Design / Motion & Animated Graphics / Product & Packaging Design / Presentation & Corporate Design / Event & Exhibition Graphics / Illustration & Custom Artwork / Print & Offline Collateral",
      description:
        "Creative designs that define brands across digital and print. From logo design to complete brand guidelines, we create visual identities that resonate with your target audience.",
      image: "🎨",
    },
    {
      id: 4,
      title: "Website Design & Development Services",
      subtitle:
        "Custom Website Design / Corporate & Business Websites / E-commerce Websites / Portfolio & Personal Branding Websites / Marketing & Campaign Websites / Blog & Content Websites / Website Redesign & Revamp / Web Animations & Interactive Design / Maintenance & Website Support / SEO & Website Optimization",
      description:
        "Creative, functional websites designed to elevate brands online. Responsive, user-friendly websites that convert visitors into customers and drive business growth.",
      image: "💻",
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
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Main Heading */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Innovative Services Crafted
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  To Elevate
                </h2>
            
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mt-2">
                  Your Brand
                </h2>
              </div>
            </div>

            {/* CTA Button */}
            <Link href='services'>
            <div className="flex-shrink-0">
              <button className="group flex items-center gap-3 cursor-pointer border-2 border-gray-100 hover:border-orange-500 px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                <span className="text-gray-800 font-semibold text-lg">
                  Explore Our Services
                </span>
                <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
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
                    className="flex items-center justify-between p-8 cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => toggleSection(service.id)}
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-orange-500 font-bold text-xl">
                        0{service.id}
                      </span>
                      {!expandedSections[service.id] && (
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                          {service.title}
                        </h3>
                      )}
                    </div>
                    <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors duration-200">
                      {expandedSections[service.id] ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedSections[service.id]
                        ? "max-h-[600px] opacity-100"
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
                              {/* Service title and description */}
                              <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                                {service.title}
                              </h4>

                              {/* Service icon */}
                              <div className="flex justify-start mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-3xl transform hover:scale-110 transition-transform duration-300">
                                  {service.image}
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
