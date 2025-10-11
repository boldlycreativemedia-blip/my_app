import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CreativeTeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const teamMembers = [
    {
      id: 0,
      type: "single",
      name: "Harsh Kuria",
      designation: "Founder & CEO",
      image: "/member-1.png",
      delay: 0,
    },
    {
      id: 2,
      type: "single",
      name: "Harshit Singh",
      designation: "Co-founder & COO",
      image: "/member-2.png",
      delay: 0.5,
    },
    {
      id: 3,
      type: "single",
      name: "Jungkal Brahma",
      designation: "Art Director",
      image: "/member-3.png",
      delay: 1,
    },
    {
      id: 4,
      type: "single",
      name: "Vipul Kumar",
      designation: "Design Head",
      image: "/member-4.png",
      delay: 1.5,
    },
    {
      id: 5,
      type: "single",
      name: "Naman Dadhich",
      designation: "Cinematographer",
      image: "/member-5.png",
      delay: 2,
    },
    {
      id: 6,
      type: "single",
      name: "Aman Mann",
      designation: "Photographer",
      image: "/member-6.png",
      delay: 3,
    },
    {
      id: 7,
      type: "single",
      name: "Aditya Xopun Borah",
      designation: "Photographer",
      image: "/member-7.png",
      delay: 3.5,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const MemberCard = ({ member, index }) => (
    <div
      className={`${
        isVisible ? "animate-fadeInUp" : "opacity-0"
      } hover:scale-110 transition-all duration-300 cursor-pointer group`}
      style={{
        animationDelay: isVisible ? `${member.delay}s` : "0s",
        animationFillMode: "both",
      }}
    >
      <div className="relative w-28 h-28 lg:w-50 lg:h-50">
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
          />
          <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs lg:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
              {member.name} <br/>
              <span className="font-light">{member.designation}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileCard = ({ member }) => (
    <div
      className={`${
        isVisible ? "animate-slideInLeft" : "opacity-0 translate-x-8"
      } hover:scale-110 transition-all duration-300 cursor-pointer group flex-shrink-0`}
      style={{
        animationDelay: isVisible ? `${member.delay}s` : "0s",
        animationFillMode: "both",
      }}
    >
      <div className="relative w-32 h-32">
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
              {member.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="w-full bg-gray-100 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Engage With Our Creative Team
          </h1>

          <div className="space-y-2 text-gray-500 text-base md:text-lg">
            <p>
              We work to create the most attractive & meaningful place for small
              businesses.
            </p>
            <p>Our Team always ready to help you.</p>
          </div>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* First Row - 4 members */}
          <div className="flex justify-center items-center gap-4 lg:gap-8 mb-8">
            {teamMembers.slice(0, 4).map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>

          {/* Second Row - 3 members */}
          <div className="flex justify-center items-center gap-4 lg:gap-8 mb-12">
            {teamMembers.slice(4, 7).map((member, index) => (
              <MemberCard key={member.id} member={member} index={index + 4} />
            ))}
          </div>

          {/* View All Button - Desktop */}
          <Link href="/about-us">
            <div className="flex justify-center">
              <div
                className={`${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                } cursor-pointer`}
                style={{
                  animationDelay: isVisible ? "3.5s" : "0s",
                  animationFillMode: "both",
                }}
              >
                <button className="bg-gray-800 cursor-pointer hover:bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="font-medium text-sm">View All</span>
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 cursor-pointer text-gray-800" />
                  </div>
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile Layout - Horizontal Scrolling Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div
                className="flex space-x-6 px-4 pb-4"
                style={{ width: "max-content" }}
              >
                {teamMembers.map((member) => (
                  <MobileCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>

          {/* View All Button for Mobile */}
          <Link href="/about-us">
          <div className="flex justify-center mt-8">
            <div
              className={`${
                isVisible ? "animate-slideInLeft" : "opacity-0 translate-x-8"
              } cursor-pointer`}
              style={{
                animationDelay: isVisible ? "3.5s" : "0s",
                animationFillMode: "both",
              }}
            >
              <button className="bg-gray-800 cursor-pointer hover:bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="font-medium text-sm">View All</span>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 cursor-pointer text-gray-800" />
                </div>
              </button>
            </div>
          </div>
          </Link>
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CreativeTeamSection;
