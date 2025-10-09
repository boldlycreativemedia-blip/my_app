"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Smartphone,
  Search,
  Monitor,
  ShoppingCart,
  Users,
  Play,
  Music,
  MessageCircle,
  Camera,
  Video,
  ArrowRight,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const page = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const formRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    organization: "",
    region: "",
    industryType: "",
    budgetRange: "",
    helpWith: "",
    message: "",
    privacyPolicy: false,
    stayUpdated: false,
  });

  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const brands = [
    { name: "Apple", icon: Smartphone },
    { name: "Google", icon: Search },
    { name: "Microsoft", icon: Monitor },
    { name: "Amazon", icon: ShoppingCart },
    { name: "Meta", icon: Users },
    { name: "Netflix", icon: Play },
    { name: "Spotify", icon: Music },
    { name: "Twitter", icon: MessageCircle },
    { name: "Instagram", icon: Camera },
    { name: "YouTube", icon: Video },
  ];

  // Form options
  const regions = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Middle East",
    "Africa",
    "South America",
  ];
  const industryTypes = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Other",
  ];
  const budgetRanges = [
    "$5K - $10K",
    "$10K - $25K",
    "$25K - $50K",
    "$50K - $100K",
    "$100K+",
  ];
  const helpOptions = [
    "Web Development",
    "Mobile App",
    "Digital Marketing",
    "UI/UX Design",
    "Consultation",
    "Other",
  ];

  // Duplicate brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  // EmailJS configuration (replace with your actual service details)
  const EMAILJS_SERVICE_ID = "your_service_id";
  const EMAILJS_TEMPLATE_ID = "your_template_id";
  const EMAILJS_PUBLIC_KEY = "your_public_key";

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || isDragging) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth / 2;

    let scrollPosition = maxScroll;
    const scrollSpeed = 1;

    const animate = () => {
      if (!isHovered && !isDragging) {
        scrollPosition += scrollSpeed;

        if (scrollPosition <= 0) {
          scrollPosition = maxScroll;
        }

        if (scrollContainer) {
          scrollContainer.scrollLeft = scrollPosition;
        }
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Handle manual scroll
  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const maxScroll = scrollWidth / 2;

    if (scrollContainer.scrollLeft >= maxScroll - 10) {
      scrollContainer.scrollLeft = 0;
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file attachment
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Create email template
  const createEmailTemplate = () => {
    const attachmentsList =
      attachments.length > 0
        ? attachments.map((att) => `• ${att.name} (${att.size})`).join("\n")
        : "No attachments";

    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT INFORMATION:
   • Full Name: ${formData.fullName}
   • Email: ${formData.email}
   • Contact Number: ${formData.contactNumber}
   • Organization: ${formData.organization || "Not specified"}

🌍 LOCATION & INDUSTRY:
   • Region: ${formData.region}
   • Industry Type: ${formData.industryType}

💼 PROJECT DETAILS:
   • Budget Range: ${formData.budgetRange}
   • Need Help With: ${formData.helpWith}

💬 MESSAGE:
${formData.message}

📎 ATTACHMENTS:
${attachmentsList}

📊 PREFERENCES:
   • Privacy Policy Accepted: ${formData.privacyPolicy ? "Yes" : "No"}
   • Stay Updated: ${formData.stayUpdated ? "Yes" : "No"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ Submitted on: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacyPolicy) {
      setSubmitStatus({
        type: "error",
        message: "Please accept the privacy policy to continue.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const emailContent = createEmailTemplate();

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        to_name: "BoldlyCreative Team",
        message: emailContent,
        reply_to: formData.email,
        // Add individual fields for better template customization
        full_name: formData.fullName,
        email: formData.email,
        contact_number: formData.contactNumber,
        organization: formData.organization,
        region: formData.region,
        industry_type: formData.industryType,
        budget_range: formData.budgetRange,
        help_with: formData.helpWith,
        user_message: formData.message,
        attachments_count: attachments.length,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        organization: "",
        region: "",
        industryType: "",
        budgetRange: "",
        helpWith: "",
        message: "",
        privacyPolicy: false,
        stayUpdated: false,
      });
      setAttachments([]);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again or contact us directly at info@boldlycreative.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const phoneHoverVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.3,
      },
    },
  };

  const emailHoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div>
      <Header />
      <section
        className="relative z-10 bg-gray-100 w-full px-6 md:px-12 py-12 md:py-20 min-h-screen"
        ref={sectionRef}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-4 sm:py-8 md:py-16">
          {/* Main Heading Section */}
          <div className="relative">+
            <motion.div
              className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-6xl"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-none text-black mb-4 sm:mb-6 md:mb-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Let's Talk More
                <br />
                <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  About Your
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-500 rounded-full flex-shrink-0">
                    <Image
                      src="/local_cafe.png"
                      alt="draw"
                      width={20}
                      height={20}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    />
                  </span>
                  Business
                </span>
              </motion.h1>
            </motion.div>
          </div>

          <motion.div
            className="relative mt-6 sm:mt-8 md:mt-12"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="text-gray-300 md:text-gray-400 text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              \\Contact Us
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <motion.section
        className="bg-white py-16 px-6 md:px-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Write us an email via this form or just send us an{" "}
              <span className="text-red-500 font-semibold">E-mail</span> at:{" "}
              <a
                href="mailto:info@boldlycreative.com"
                className="text-red-500 underline"
              >
                info@boldlycreative.com
              </a>
            </p>
            <p className="text-sm text-gray-500">we will follow up in 24 hrs</p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Basic Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name*"
                  required
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email*"
                  required
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400"
                />
              </motion.div>
            </div>

            {/* Contact & Organization Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Contact number"
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Organization"
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400"
                />
              </motion.div>
            </div>

            {/* Dropdown Selectors Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <select
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Industry type</option>
                  {industryTypes.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Budget & Help Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Choose your budget range</option>
                  {budgetRanges.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <select
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">You need help with?</option>
                  {helpOptions.map((help) => (
                    <option key={help} value={help}>
                      {help}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Message Textarea */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help?*"
                required
                rows={5}
                className="w-full px-4 py-4 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400 resize-none"
              />
            </motion.div>

            {/* File Attachment */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors duration-300">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-gray-600">
                    Add Attachment from your{" "}
                    <span className="text-red-500 underline">Computer</span> or{" "}
                    <span className="text-red-500 underline">Google Drive</span>{" "}
                    or Through{" "}
                    <span className="text-red-500 underline">URLs</span>
                  </span>
                </label>
              </div>

              {/* Display attachments */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((attachment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {attachment.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({attachment.size})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Checkboxes */}
            <motion.div
              className="space-y-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">
                  I have read Boldlycreative{" "}
                  <a href="#" className="text-red-500 underline">
                    Privacy Policy
                  </a>{" "}
                  and agree to the{" "}
                  <a href="#" className="text-red-500 underline">
                    Terms of Use
                  </a>
                  *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="stayUpdated"
                  checked={formData.stayUpdated}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">
                  I want to stay updated with upcoming technology Trends
                </span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center pt-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.privacyPolicy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Status Messages */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}

            {/* Security Notice */}
            <motion.div
              className="flex items-center justify-center gap-8 pt-6 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Your data is 100% safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Your data privacy is protected</span>
              </div>
            </motion.div>
          </motion.form>
        </div>
      </motion.section>

      <section className="py-16 px-6 md:px-12 bg-gradient-to-tr from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Address Section */}
          <motion.div
            variants={cardVariants}
            className="bg-[#06D6A0]  rounded-3xl p-8 md:p-12 shadow-2xl shadow-green-500/20 mb-12"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-6"
            >
              <motion.div
                className="bg-white p-4 rounded-2xl shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <MapPin className="w-8 h-8 text-b" />
              </motion.div>

              <div className="flex-1">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                  variants={itemVariants}
                >
                  Address
                </motion.h2>
                <motion.p
                  className="text-gray-600 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  Plot 14, Akash Nagar, Ghaziabad, Uttar Pradesh 201013{" "}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Additional Contacts */}
            <motion.div
              variants={cardVariants}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl shadow-green-500/20"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 mb-8"
              >
                <motion.div
                  className="bg-white p-3 rounded-2xl shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.4 },
                  }}
                >
                  <Phone className="w-6 h-6 text-black" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Additional Contacts
                </h3>
              </motion.div>

              <div className="space-y-6">
                {/* Phone Numbers */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <motion.a
                    href="tel:+917011575305"
                    variants={phoneHoverVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 group cursor-pointer border border-green-200"
                  >
                    <Phone className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                    <span className="text-green-700 font-medium">
                      + (91) 7011575305
                    </span>
                  </motion.a>

                  <motion.a
                    href="tel:+9196506 76241"
                    variants={phoneHoverVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 group cursor-pointer border border-green-200"
                  >
                    <Phone className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                    <span className="text-green-700 font-medium">
                      + (91) 96506 76241
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Additional Email IDs */}
            <motion.div
              variants={cardVariants}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl shadow-green-500/20"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 mb-8"
              >
                <motion.div
                  className="bg-white p-3 rounded-2xl shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 15, -15, 0],
                    transition: { duration: 0.4 },
                  }}
                >
                  <Mail className="w-6 h-6 text-black" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Additional Email IDs
                </h3>
              </motion.div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:boldlycreativemedia@gmail.com  "
                  variants={emailHoverVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group cursor-pointer border border-blue-200"
                >
                  <Mail className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-700 font-medium text-lg">
                      boldlycreativemedia@gmail.com
                    </span>
                    <p className="text-blue-500 text-sm mt-1">
                      General Inquiries
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute bottom-20 left-20 w-16 h-16 bg-white/15 rounded-full blur-lg"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Contact CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <motion.p
              className="text-black text-lg mb-6"
              variants={itemVariants}
            >
              Ready to start your project? Get in touch with us today!
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start a Conversation
              <br />
              <span className="text-green-400">(mail above)</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Moving Brand Logos Section */}
      <motion.div
        className="py-12 bg-gray-100 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div
          ref={scrollRef}
          className="flex items-center gap-12 md:gap-16 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onScroll={handleScroll}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {duplicatedBrands.map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors duration-300 whitespace-nowrap flex-shrink-0 px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <brand.icon className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl lg:text-2xl font-semibold">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Custom Scrollbar Hide */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </motion.div>
      <Footer />
    </div>
  );
};

export default page;
