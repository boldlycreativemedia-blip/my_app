import React from "react";
import {
  Mail,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1F1B1C] text-white">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 md:mb-16">
            {/* Left Section - CTA */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                Ready to get
                <br />
                started?
              </h2>
              <p className="text-gray-400 mb-6 md:mb-8 text-sm sm:text-base leading-relaxed">
                If there are questions you want to ask,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                we will answer all your questions
              </p>

              {/* Email Input */}
              <div className="relative max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-b border-gray-500 w-full pb-3 pr-12 focus:outline-none focus:border-white text-sm sm:text-base placeholder-gray-500 transition-colors"
                />
                <button
                  className="absolute right-0 bottom-2 text-white hover:text-gray-300 transition-colors"
                  aria-label="Submit email"
                >
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Right Section - Navigation & Contact */}
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-between gap-8 sm:gap-6 md:gap-8">
              {/* Navigation Links */}
              <div className="flex flex-col items-start">
                {/* Logo */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-2">
                    <Image
                      src="/logo.png"
                      width={70}
                      height={65}
                      alt="Boldly Creative Logo"
                      className="cursor-pointer text-lg"
                    ></Image>
                  </div>
                </div>

                <nav className="flex flex-col space-y-3 md:space-y-4">
                  <a
                    href="/#"
                    className="hover:text-gray-400 transition-colors text-sm sm:text-base"
                  >
                    Home
                  </a>
                  <a
                    href="/about"
                    className="hover:text-gray-400 transition-colors text-sm sm:text-base"
                  >
                    About
                  </a>
                  <a
                    href="/services"
                    className="hover:text-gray-400 transition-colors text-sm sm:text-base"
                  >
                    Services
                  </a>
                  <a
                    href="https://www.behance.net/boldlycreativemedia"
                    className="hover:text-gray-400 transition-colors text-sm sm:text-base"
                  >
                    Portfolio
                  </a>
                </nav>
              </div>

              {/* Contact Info */}
              <div className="text-left sm:text-right">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 md:mb-4 break-words">
                  boldlycreativemedia@gmail.com
                </h3>
                <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-gray-300">
                  Offices
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-gray-400 text-sm sm:text-base">
                  <p>Delhi NCR - India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-5 md:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              {/* Copyright and Legal Links */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                <p className="whitespace-nowrap">
                  © 2025 Copyright by boldlycreative
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <a
                    href="/privacy-policy"
                    className="hover:text-white transition-colors whitespace-nowrap"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/termsandconditions"
                    className="hover:text-white transition-colors whitespace-nowrap"
                  >
                    Terms & Conditions
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.instagram.com/boldly.creativemedia/"
                  aria-label="Instagram"
                  className="p-2 rounded-full hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                  <img
                    src="/instagram.png"
                    alt="Instagram"
                    className="h-10 w-10"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/boldly-creative-media"
                  aria-label="LinkedIn"
                  className="p-2 rounded-full hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                  <img
                    src="/linkedin.png"
                    alt="LinkedIn"
                    className="h-10 w-10"
                  />
                </a>
                <a
                  href="https://www.twitter.com"
                  aria-label="Twitter"
                  className="p-2 rounded-full hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                  <img
                    src="/twitter.png"
                    alt="Twitter"
                    className="h-10 w-10"
                  />
                </a>
                <a
                  href="https://www.facebook.com"
                  aria-label="Facebook"
                  className="p-2 rounded-full hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                  <img
                    src="/facebook.png"
                    alt="Facebook"
                    className="h-10 w-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
