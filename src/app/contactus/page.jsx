"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";
import {
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

function ContactContent() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const formRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollPositionRef = useRef(0);
  const animationRef = useRef(null);

  // Get email from URL query parameter
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email");

  // Form state - Initialize with email from URL if present
  const [formData, setFormData] = useState({
    fullName: "",
    email: emailFromUrl || "",
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

  // Update email when URL parameter changes
  useEffect(() => {
    if (emailFromUrl) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromUrl,
      }));

      // Smooth scroll to form after a brief delay
      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [emailFromUrl]);

  const brands = [
    { image: "/Brand-1.png", alt: "Brand 1" },
    { image: "/Brand-2.png", alt: "Brand 2" },
    { image: "/Brand-3.png", alt: "Brand 3" },
    { image: "/Brand-4.png", alt: "Brand 4" },
    { image: "/Brand-5.png", alt: "Brand 5" },
    { image: "/Brand-6.png", alt: "Brand 6" },
    { image: "/Brand-7.png", alt: "Brand 7" },
    { image: "/Brand-8.png", alt: "Brand 8" },
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
    "Video Production Services",
    "Photography Services",
    "Graphic & Design Services",
    "Website Design & Development Services",
  ];

  // EmailJS configuration (replace with your actual service details)
  const EMAILJS_SERVICE_ID = "service_lwh8suv";
  const EMAILJS_TEMPLATE_ID = "template_z83qww4";
  const EMAILJS_PUBLIC_KEY = "AJa4K0h87Mna2MZFa";

  // Duplicate brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1;

    const animate = () => {
      if (!isHovered && !isDragging && scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth / 2;

        scrollPositionRef.current += scrollSpeed;

        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0;
        }

        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging]);

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollPositionRef.current = scrollContainer.scrollLeft;

    const maxScroll = scrollContainer.scrollWidth / 2;

    if (scrollContainer.scrollLeft >= maxScroll - 10) {
      scrollContainer.scrollLeft = 0;
      scrollPositionRef.current = 0;
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
        full_name: formData.fullName,
        email: formData.email,
        contact_number: formData.contactNumber,
        organization: formData.organization,
        region: formData.region,
        industry_type: formData.industryType,
        help_with: formData.helpWith,
        user_message: formData.message,
        attachments_count: attachments.length,
        stay_updated: formData.stayUpdated ? "Yes" : "No",
      };

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
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const phoneHoverVariants = {
    hover: {
      scale: 1.02,
      backgroundColor: "#f0f9ff",
      borderColor: "#0078FA",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const emailHoverVariants = {
    hover: {
      scale: 1.02,
      backgroundColor: "#f0f9ff",
      borderColor: "#0078FA",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <Header />
      <section
        className="relative z-10 bg-white max-w-[1920px] px-6 md:px-12 py-0 md:py-12 pb-6"
        ref={sectionRef}
      >
        <div className="max-w-[1920px] mx-auto px-4 py-12 sm:px-6">
          {/* Main Heading Section */}
          <div className="relative">
            <motion.div
              className="xl:max-w-[1920px] sm:max-w-2xl md:max-w-3xl lg:max-w-6xl"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-none text-black mb-2"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Let's Talk More
                <br />
                <span className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  About Your
                  <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#EC4D37] rounded-full flex-shrink-0">
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
              className="text-[#BBBBBB] md:text-[#BBBBBB] text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-none select-none text-start md:text-right overflow-hidden"
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
        className="bg-[#F8F8F8] py-12 mt-2 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white rounded-lg p-8 shadow-sm"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-md md:text-lg text-[#212529] mb-2 font-semibold">
                Write us an email via this form or just send us an{" "}
                <span className="text-[#EC4D37] font-semibold">E-mail</span> at:{" "}
                <a
                  href="mailto:boldlycreativemedia@gmail.com"
                  className="text-[#EC4D37] underline"
                >
                  boldlycreativemedia@gmail.com
                </a>
              </p>
              <p className="text-lg text-[#212529] font-semibold">
                we will follow up in 24 hrs
              </p>
            </motion.div>
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
                  className="w-full px-4 py-4 border-2 border-gray-200 focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400 rounded-lg"
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
                  className="w-full px-4 py-4 border-2 border-gray-200 focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400 rounded-lg"
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
                  className="w-full px-4 py-4 border-2 border-gray-200 focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400 rounded-lg"
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
                  className="w-full px-4 py-4 border-2 border-gray-200 focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400 rounded-lg"
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
                className="relative"
              >
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-white text-gray-600 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "12px",
                  }}
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
                className="relative"
              >
                <select
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-white text-gray-600 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "12px",
                  }}
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
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative"
              >
                <select
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-white text-gray-600 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "12px",
                  }}
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
                className="w-full px-4 py-4 border-2 rounded-lg border-gray-200 focus:border-[#EC4D37] outline-none transition-colors duration-300 bg-transparent text-gray-800 placeholder-gray-400 resize-none"
              />
            </motion.div>

            {/* File Attachment */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="text-center">
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
                  className="cursor-pointer flex items-center justify-start gap-2"
                >
                  <img src="/attach_file.png" alt="Safe" className="w-5 h-5" />
                  <span className="text-gray-700 text-sm">
                    Add Attachment from your{" "}
                    <span className="text-[#EC4D37] underline">Computer</span>{" "}
                    or{" "}
                    <span className="text-[#EC4D37] underline">
                      Google Drive
                    </span>{" "}
                    or Through{" "}
                    <span className="text-[#EC4D37] underline">URLs</span>
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
                        <img
                          src="/attach_file.png"
                          alt="Safe"
                          className="w-5 h-5"
                        />
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
                        className="text-[#EC4D37] hover:text-[#ec4933] transition-colors"
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
                  className="mt-1 w-4 h-4 text-[#EC4D37] border-2 border-gray-300 rounded focus:ring-[#EC4D37]"
                />
                <span className="text-sm text-gray-600">
                  I have read Boldlycreative{" "}
                  <a href="#" className="text-[#EC4D37] underline">
                    Privacy Policy
                  </a>{" "}
                  and agree to the{" "}
                  <a href="#" className="text-[#EC4D37] underline">
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
                  className="mt-1 w-4 h-4 text-[#EC4D37] border-2 border-gray-300 rounded focus:ring-[#EC4D37]"
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
                className="inline-flex items-center gap-2 bg-[#EC4D37] hover:bg-[#ef452e] disabled:bg-gray-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
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
              className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 text-sm text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="flex items-center gap-2">
                <img src="/safe.png" alt="Safe" className="w-5 h-5" />
                <span>Your data is 100% safe</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/person_shield.png"
                  alt="Privacy Shield"
                  className="w-5 h-5"
                />
                <span>Your data privacy is protected</span>
              </div>
            </motion.div>
          </motion.form>
        </div>
      </motion.section>

      <section className="py-8 max-w-[1920px] mx-auto w-full px-6 bg-white flex items-center justify-center overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            className=" relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Address Section */}
            <motion.div
              variants={cardVariants}
              className="bg-[#78E4C8] max-w-[1920px] rounded-xl p-3 shadow-2xl shadow-green-500/20 mb-12"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-6"
              >
                <motion.div
                  className="p-4"
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    src="/address.png"
                    alt="Address"
                    className="w-12 h-12 object-contain"
                  />
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
                    Plot 14, Akash Nagar, Ghaziabad, Uttar Pradesh 201013
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Additional Contacts */}
              <motion.div
                variants={cardVariants}
                className="bg-white border border-gray-300 backdrop-blur-sm rounded-xl p-8 md:p-10 "
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 mb-8"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.4 },
                    }}
                  >
                    <img
                      src="/call.png"
                      alt="call"
                      className="w-8 h-8 object-contain"
                    />
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
                      className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 group cursor-pointer border border-gray-200 bg-white"
                    >
                      <img
                        src="/call.png"
                        alt="call"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-[#0078FA] font-medium">
                        + (91) 7011575305
                      </span>
                    </motion.a>

                    <motion.a
                      href="tel:+919650676241"
                      variants={phoneHoverVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 p-4 rounded-lg transition-all duration-300 group cursor-pointer border border-gray-200 bg-white"
                    >
                      <img
                        src="/call.png"
                        alt="call"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-[#0078FA] font-medium">
                        + (91) 96506 76241
                      </span>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Additional Email IDs */}
              <motion.div
                variants={cardVariants}
                className="bg-white border border-gray-300 rounded-xl p-8 md:p-10"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 mb-8"
                >
                  <motion.div
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
                    href="mailto:boldlycreativemedia@gmail.com"
                    variants={emailHoverVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-4 p-5 rounded-lg transition-all duration-300 group cursor-pointer border border-gray-200 bg-white"
                  >
                    <Mail className="w-8 h-8 text-[#0078FA]" />
                    <div>
                      <span className="text-[#0078FA] font-medium text-xs md:text-lg">
                        boldlycreativemedia@gmail.com
                      </span>
                      <p className="text-gray-500 text-sm mt-1">
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
          </motion.div>
        </div>
      </section>

      {/* Moving Brand Logos Section */}
      <motion.div
        className=" bg-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        {/* Scrolling Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-12 md:gap-16 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={() => setIsHovered(false)}
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
              key={`brand-${index}`}
              className="flex items-center justify-center whitespace-nowrap flex-shrink-0 px-4 py-2 group"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={brand.image}
                alt={brand.alt}
                className="h-20 sm:h-24 md:h-30 lg:h-36 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
