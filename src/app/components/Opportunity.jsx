import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CareerPage = () => {
  const [selectedRole, setSelectedRole] = useState("Role 1");
  const [loading, setLoading] = useState(false);

  // Sample data structure - in real app, you can modify this jobData object
  const jobData = {
    "Role 1": [
      {
        id: 1,
        title: "Senior Frontend Developer",
        description:
          "Join our dynamic team as a Senior Frontend Developer. Work with cutting-edge technologies including React, Next.js, and modern web frameworks to create exceptional user experiences.",
        isOpen: true,
        applicationLink: "https://forms.google.com/frontend-developer",
      },
      {
        id: 2,
        title: "UI/UX Designer",
        description:
          "Create beautiful and intuitive user interfaces. Collaborate with cross-functional teams to design user-centered digital experiences that drive engagement.",
        isOpen: true,
        applicationLink: "https://forms.google.com/ui-ux-designer",
      },
      {
        id: 3,
        title: "Product Manager",
        description:
          "Lead product strategy and roadmap development. Work closely with engineering and design teams to deliver innovative solutions that meet customer needs.",
        isOpen: true,
        applicationLink: "https://forms.google.com/product-manager",
      },
    ],
    "Role 2": [
      {
        id: 4,
        title: "Full Stack Engineer",
        description:
          "Build end-to-end solutions using modern web technologies. Work with both frontend and backend systems to create scalable applications.",
        isOpen: true,
        applicationLink: "https://forms.google.com/fullstack-engineer",
      },
      {
        id: 5,
        title: "DevOps Engineer",
        description:
          "Manage cloud infrastructure and deployment pipelines. Ensure high availability and performance of our production systems.",
        isOpen: true,
        applicationLink: "https://forms.google.com/devops-engineer",
      },
      {
        id: 6,
        title: "Data Engineer",
        description:
          "Design and implement data pipelines and analytics solutions. Work with big data technologies to derive insights from complex datasets.",
        isOpen: true,
        applicationLink: "https://forms.google.com/data-engineer",
      },
    ],
    "Role 3": [
      {
        id: 7,
        title: "Marketing Specialist",
        description:
          "Drive digital marketing campaigns and brand awareness. Develop comprehensive marketing strategies across multiple channels.",
        isOpen: true,
        applicationLink: "https://forms.google.com/marketing-specialist",
      },
      {
        id: 8,
        title: "Content Creator",
        description:
          "Create compelling content for various digital platforms. Develop engaging narratives that resonate with our target audience.",
        isOpen: true,
        applicationLink: "https://forms.google.com/content-creator",
      },
      {
        id: 9,
        title: "SEO Analyst",
        description:
          "Optimize website performance and search rankings. Analyze data and implement strategies to improve organic visibility.",
        isOpen: false, // Example of closed position
        applicationLink: "https://forms.google.com/seo-analyst",
      },
    ],
    "Role 4": [
      {
        id: 10,
        title: "Sales Executive",
        description:
          "Drive business growth through strategic sales initiatives. Build relationships with clients and identify new business opportunities.",
        isOpen: true,
        applicationLink: "https://forms.google.com/sales-executive",
      },
      {
        id: 11,
        title: "Customer Success Manager",
        description:
          "Ensure customer satisfaction and retention. Work closely with clients to maximize their success with our products and services.",
        isOpen: true,
        applicationLink: "https://forms.google.com/customer-success",
      },
      {
        id: 12,
        title: "Business Analyst",
        description:
          "Analyze business processes and requirements. Bridge the gap between business needs and technical solutions.",
        isOpen: true,
        applicationLink: "https://forms.google.com/business-analyst",
      },
    ],
  };

  const roles = ["Role 1", "Role 2", "Role 3", "Role 4"];

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

  const handleJobClick = (job) => {
    if (job.isOpen && job.applicationLink) {
      window.open(job.applicationLink, "_blank");
    }
  };

  const tabVariants = {
    inactive: {
      backgroundColor: "#f3f4f6",
      color: "#6b7280",
      scale: 1,
    },
    active: {
      backgroundColor: "#fbbf24",
      color: "#000000",
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Open Job Positions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're growing our team of bold thinkers and creative innovators.
            Explore our current openings and find your place in a culture that
            values fearless ideas and purposeful work.
          </p>
        </motion.div>

        {/* Role Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex bg-gray-400 rounded-lg p-2 gap-10 shadow-lg">
            {roles.map((role) => (
              <motion.button
                key={role}
                className="px-10 gap-10 py-3 cursor-pointer rounded-lg font-medium transition-all duration-200"
                variants={tabVariants}
                animate={selectedRole === role ? "active" : "inactive"}
                onClick={() => setSelectedRole(role)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
              >
                {role}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {jobData[selectedRole]?.map((job, index) => (
              <motion.div
                key={job.id}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleJobClick(job)}
                className={`relative overflow-hidden rounded-2xl p-8 shadow-xl transition-all duration-300 group ${
                  job.isOpen ? "cursor-pointer" : "cursor-not-allowed"
                } bg-[#1F1B1C] text-white hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 ${
                  !job.isOpen ? "opacity-60" : ""
                }`}
                style={{ minHeight: "280px" }}
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

                {/* Arrow Icon */}
                <div className="mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 17l9.2-9.2M17 17V7H7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-90 mb-4">
                    {job.description}
                  </p>

                  {job.isOpen && (
                    <motion.div
                      className="inline-flex items-center text-sm font-semibold"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Apply Now
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}

                  {!job.isOpen && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      POSITION CLOSED
                    </div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-white bg-opacity-5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CareerPage;
