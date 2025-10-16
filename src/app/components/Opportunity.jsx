import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CareerPage = () => {
  const [loading, setLoading] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);

  const jobData = [
    {
      id: 1,
      emoji: "🎬",
      title: "Video Editing Intern",
      subtitle: "Boldly Creative Media",
      location: "Remote",
      type: "Unpaid Internship",
      duration: "3 months",
      description:
        "We're looking for a Video Editing Intern with a strong eye for storytelling, rhythm, and modern editing style. You'll work on real client projects — including brand promos, artist content, and event highlights — gaining hands-on experience in professional creative production.",
      responsibilities: [
        "Edit short-form and long-form content for brands, events, and artists",
        "Collaborate with our creative team on story flow, pacing, and music sync",
        "Handle raw footage, transitions, and color correction for high-quality output",
        "Contribute to creative discussions and idea generation",
      ],
      requirements: [
        "A strong portfolio or showreel showcasing your editing skills",
        "Proficiency in Premiere Pro, After Effects, or DaVinci Resolve",
        "Understanding of social media trends and editing aesthetics",
        "Self-motivated, deadline-oriented, and open to feedback",
      ],
      perks: [
        "Opportunity to work on projects for big brands and artists",
        "Learn real-world editing workflows and creative direction",
        "Letter of experience and portfolio credit upon completion",
      ],
      isOpen: true,
      applicationEmail: "boldlycreativemedia@gmail.com",
    },
    {
      id: 2,
      emoji: "🎨",
      title: "Graphic Design Intern",
      subtitle: "Boldly Creative Media",
      location: "Remote",
      type: "Unpaid Internship",
      duration: "3 months",
      description:
        "We're looking for a Graphic Design Intern with a strong sense of aesthetics, layout, and visual storytelling. You'll design creatives for brand campaigns, events, and artist promotions — contributing to real client projects and building a solid design portfolio.",
      responsibilities: [
        "Design social media posts, event creatives, and brand visuals",
        "Assist in creating branding materials — logos, posters, and ad creatives",
        "Collaborate with the video and content team for cohesive campaigns",
        "Bring fresh ideas and creative direction to every project",
      ],
      requirements: [
        "A creative portfolio showcasing your best design work (mandatory)",
        "Proficiency in Adobe Photoshop, Illustrator, or Figma",
        "Good understanding of color, typography, and composition",
        "Awareness of design trends and social media aesthetics",
        "Reliable, detail-oriented, and eager to learn",
      ],
      perks: [
        "Opportunity to design for real brands, events, and artists",
        "Work closely with a creative team and gain hands-on experience",
        "Letter of experience and portfolio credit upon completion",
      ],
      isOpen: true,
      applicationEmail: "boldlycreativemedia@gmail.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const handleJobClick = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job positions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Join Our Creative Team
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Boldly Creative Media is seeking passionate interns to join our
            team. Gain hands-on experience working on real client projects and
            build your portfolio.
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {jobData.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleJobClick(job.id)}
              className="relative overflow-hidden rounded-2xl p-8 shadow-xl transition-all duration-300 cursor-pointer bg-[#1F1B1C] text-white hover:bg-gradient-to-br hover:from-[#EC4D37] hover:to-[#EC4D37]"
            >
              {/* Geometry Icon in Top Right Corner */}
              <div className="absolute -top-0 -right-4 w-30 h-24">
                <Image
                  src="/Frame2085660656.png"
                  alt="geometry"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Emoji and Title */}
                <div className="mb-4">
                  <span className="text-4xl mb-3 block">{job.emoji}</span>
                  <h3 className="text-2xl font-bold leading-tight mb-1">
                    {job.title}
                  </h3>
                  <p className="text-lg opacity-90">{job.subtitle}</p>
                </div>

                {/* Job Meta Info */}
                <div className="flex flex-wrap gap-3 mb-4 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    📍 {job.location}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    🕒 {job.type}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    ⏱️ {job.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed opacity-90 mb-4">
                  {job.description}
                </p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 mt-6"
                    >
                      {/* What You'll Do */}
                      <div>
                        <h4 className="font-bold text-lg mb-2">
                          What You'll Do:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
                          {job.responsibilities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* What We're Looking For */}
                      <div>
                        <h4 className="font-bold text-lg mb-2">
                          What We're Looking For:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
                          {job.requirements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Perks */}
                      <div>
                        <h4 className="font-bold text-lg mb-2">Perks:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
                          {job.perks.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply Button */}
                      <div className="pt-4">
                        <a
                          href={`mailto:${job.applicationEmail}?subject=Application for ${job.title}`}
                          className="inline-block bg-white text-[#1F1B1C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Apply Now via Email
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Click to expand/collapse */}
                <motion.div
                  className="inline-flex items-center text-sm font-semibold mt-4"
                  whileHover={{ opacity: 1 }}
                >
                  {expandedJob === job.id ? "Show Less" : "Learn More"}
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      expandedJob === job.id ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-white bg-opacity-5 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CareerPage;
