import React, { useState } from "react";
import { Plus, Minus, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const DigitalMarketingFAQs = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "What services does Boldly Creative Media offer?",
      answer:
        "We offer complete creative production services — including event coverage, video editing, cinematography, photography, branding, and motion graphics. From planning to final delivery, we handle every detail with precision and creativity.",
    },
    {
      question:
        "Do you work with both brands and individual artists?",
      answer:
        "Yes! We collaborate with startups, established brands, creators, and artists to craft visuals that tell their story and amplify their presence.",
    },
    {
      question:
        "How long does a typical project take?",
      answer:
        "Project timelines vary based on scale — a short social media edit may take 2–3 days, while a full event production or campaign can range from 1–3 weeks. We always ensure on-time delivery without compromising quality.",
    },
    {
      question:
        "What makes Boldly Creative Media different from other agencies?",
      answer:
        "Our strength lies in storytelling and execution. We merge cinematic visuals with creative direction — ensuring every frame captures emotion, energy, and brand essence. Our team of artists and creators are graduates from reputed art colleges, bringing both technical expertise and a strong design foundation to every project.",
    },
    {
      question: "Can you handle full event coverage and post-production?",
      answer:
        "Absolutely. From large-scale festivals to intimate performances, we manage the entire process — from on-ground shooting to editing, grading, and final delivery.",
    },
    {
      question: "How can I get started with a project?",
      answer:
        "You can reach out through our contact form or email. Once we understand your goals, we’ll share a concept, timeline, and budget proposal to kick things off.",
    }
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.1, // Initial delay before starting
      },
    },
  };

  // Animation variants for each FAQ item
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Creative Media FAQs
          </h1>
          <p className="text-gray-600 max-w-2xl text-xl mx-auto mb-8 leading-relaxed">
            As a leading creative production agency, we specialize in crafting
            high-impact visuals, brand stories, and digital experiences. Here
            you’ll find answers to the most common questions about our video
            production, branding, and content creation services.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contactus" className="w-full sm:w-auto">
              <button className="px-6 cursor-pointer py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 font-medium hover:border-gray-400 transition-colors duration-200 flex items-center gap-2">
                More Questions
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* FAQ Items with Stagger Animation */}
        <motion.div
          className="space-y-6 cursor-pointer"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true, // Animation happens only once
            margin: "-50px", // Trigger animation 50px before entering viewport
          }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="transition-all duration-300 hover:scale-110"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-7 text-left flex items-center justify-between transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg md:text-3xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {expandedItems[index] ? (
                    <Minus className="w-6 h-6 text-gray-500 cursor-pointer" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-500 cursor-pointer" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItems[index]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Separator Line - appears for all items except the last one */}
              {index < faqData.length - 1 && (
                <motion.div
                  className="border-b border-gray-300 mx-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.6,
                    delay: (index + 1) * 0.2 + 0.3,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ease-in-out {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DigitalMarketingFAQs;
