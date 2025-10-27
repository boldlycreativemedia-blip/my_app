"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  Phone,
  User,
  Briefcase,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Navigation items
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/services", label: "Services", icon: Package },
  ];

  // Right side action items
  const actionItems = [
    {
      href: "/career",
      label: "Career",
      icon: Briefcase,
      description: "Join Our Team",
    },
    {
      href: "/contactus",
      label: "Contact",
      icon: Phone,
      description: "Get In Touch",
    },
  ];

  return (
    <>
      {/* Desktop Header - Original Style */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          hidden md:flex
          fixed top-4 left-1/2 -translate-x-1/2 
          z-50 bg-[#1F1B1C] backdrop-blur-md text-white 
          rounded-full border border-white/10
          px-6 py-4 
          justify-between items-center 
          w-[95%] max-w-7xl shadow-lg h-18 cursor-pointer
        "
      >
        {/* Left Side Links (Desktop) */}
        <div className="flex gap-8 items-center cursor-pointer">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 transition-all duration-300 relative group cursor-pointer ${
                    active ? "text-[#EC4D37]" : "text-white hover:text-[#EC4D37]"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EC4D37] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Middle Logo - Absolutely centered */}
        <motion.div
          className="justify-center cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              width={70}
              height={65}
              alt="Boldly Creative Logo"
              className="cursor-pointer"
            />
          </Link>
        </motion.div>

        {/* Right Icons (Desktop) */}
        <div className="flex gap-4 items-center">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            const isContactButton = item.href === "/contactus";

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index + 0.4, duration: 0.4 }}
                className="relative group"
              >
                <Link href={item.href}>
                  {isContactButton ? (
                    <motion.button
                      className="bg-white text-black rounded-full px-5 py-2.5 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={18} />
                      </motion.div>
                      <span>{item.label}</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      className="text-white hover:text-[#EC4D37] w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={18} />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  )}
                </Link>

                {/* Tooltip */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#1F1B1C] text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                >
                  {item.description}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 border-4 border-transparent border-b-[#1F1B1C]" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Header - New Transparent Style */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          md:hidden
          top-0 left-0 right-0
          z-50 bg-transparent
          px-6 py-4
          flex justify-between items-center
        "
      >
        {/* Logo */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Boldly Creative Logo"
              className="cursor-pointer"
            />
          </Link>
        </motion.div>

        {/* Hamburger Menu Button */}
        <motion.button
          className="relative z-50 w-10 h-10 rounded-full bg-[#1F1B1C] backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden inset-0 z-40 bg-[#1F1B1C]/95 backdrop-blur-xl"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full flex flex-col items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Items */}
              <div className="space-y-6 mb-12">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.2, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-4 text-2xl font-medium transition-all duration-300 ${
                          active
                            ? "text-[#EC4D37]"
                            : "text-white hover:text-[#EC4D37]"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={28} />
                        </motion.div>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-32 h-px bg-white/20 mb-12"
              />

              {/* Action Items */}
              <div className="flex gap-6">
                {actionItems.map((item, index) => {
                  const Icon = item.icon;
                  const isContactButton = item.href === "/contactus";

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + 0.1 * index, duration: 0.3 }}
                    >
                      <Link href={item.href} onClick={() => setMenuOpen(false)}>
                        <motion.button
                          className={`
                            px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all duration-300
                            ${
                              isContactButton
                                ? "bg-white text-black shadow-lg"
                                : "bg-white/10 text-white border border-white/20"
                            }
                          `}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}