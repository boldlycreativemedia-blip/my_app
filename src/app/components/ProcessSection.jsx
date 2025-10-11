import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProcessSection = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const processSteps = [
    {
      id: "01",
      title: "Strategy & Ideation",
      description:
        "We get to creative can work, especially if you don't have a strategy built for your brand.",
      points: [
        'Determining your "why" and our "how"',
        "Content goal setting",
        "Content road mapping",
      ],
      footer: "No contact and rethink your content so it converts to cash.",
    },
    {
      id: "02",
      title: "Pre Production",
      description: "We handle all of the boring sh*t.",
      points: [
        "Talent scouting",
        "Organizing all logistics",
        "Hiring talent",
        "Setting up shoot dates",
      ],
      footer:
        "We gather all of the assets needed to bring your vision to life.",
    },
    {
      id: "03",
      title: "Complete Project Coordination",
      description:
        "Dealing with creatives is the worst. Let us take the reins.",
      points: [
        "Setting timelines",
        "Reviewing the creative brief",
        "Preparing for production",
      ],
      footer:
        "We manage it all - stay informed with project updates, Effortless for you, results guaranteed.",
    },
    {
      id: "04",
      title: "Production",
      description:
        "We handle all the heavy lifting on set, so you don't have to.",
      points: [
        "On the front lines filming",
        "Directing the shot",
        "Driving your message home",
      ],
      footer: "Creative limits pushed. Production budget met.",
    },
    {
      id: "05",
      title: "Post Production",
      description:
        "Content stand out takes time that you don't have, but we do.",
      points: [
        "Efficient editing",
        "Retention based editing",
        "Quality control",
      ],
      footer: "Your creative brought to life, positioned for profitability.",
    },
    {
      id: "06",
      title: "Refine & Scale",
      description:
        "Creating a content system takes an average of 500 hours per year - don't you have better things to do?",
      points: [
        "Integrating with your business seamlessly",
        "Supporting you with content systems built for scale",
        "Refining what works",
      ],
      footer:
        "We create what works, then hit the ground running with a fresh take every two weeks. Consistently adapting and evolving our approach based on the data.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * 300);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Process
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="flex flex-col lg:flex-row items-start gap-8 relative"
              >
                {/* Content - Always on Left */}
                <div className="flex-1 min-w-0 lg:pr-8">
                  <motion.div
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:bg-[#EC4D37] cursor-pointer transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h2>

                    <p className="text-gray-600 text-lg mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {step.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {step.points.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            visibleItems.includes(index)
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            delay: pointIndex * 0.1 + 0.3,
                            duration: 0.5,
                          }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-white group-hover:to-black mt-2 flex-shrink-0 transition-all duration-300"></div>
                          <span className="text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="border-t border-gray-100 group-hover:border-orange-200 pt-6 transition-colors duration-300">
                      <p className="text-gray-600 italic leading-relaxed group-hover:text-white transition-colors duration-300">
                        {step.footer}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Step Number - Always on Right */}
                <motion.div
                  className="flex-shrink-0 lg:relative lg:z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[#EC4D37] to-[#EC4D37] hover:from-gray-200 hover:to-gray-500 flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300">
                    <span className="text-2xl lg:text-3xl font-bold text-white">
                      {step.id}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessSection;
