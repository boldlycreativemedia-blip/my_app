"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Package2,
  Phone,
  User2,
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
    { href: "/", label: "Home", icon: House },
    { href: "/about", label: "About", icon: User2 },
    { href: "/services", label: "Services", icon: Package2 },
  ];

  // Right side action items (removed Profile/User button)
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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2 
        z-50 bg-[#1F1B1C] backdrop-blur-md text-white 
        rounded-full border border-white/10
        px-6 py-4 
        flex justify-between items-center 
        w-[95%] max-w-6xl shadow-2xl h-18
      "
    >
      {/* Left Side Links (Desktop) */}
      <div className="hidden md:flex gap-8 items-center">
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
                className={`flex items-center gap-2 transition-all duration-300 relative group ${
                  active ? "text-red-500" : "text-white hover:text-red-400"
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
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-red-500 rounded-full"
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

      {/* Hamburger Menu (Mobile) */}
      <motion.button
        className="md:hidden flex items-center text-white relative z-10"
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ scale: 0.9 }}
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

      {/* Middle Logo - Absolutely centered */}
      <motion.div
        className=""
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
      <div className="hidden md:flex gap-4 items-center">
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
                  // Contact button as white pill shape with icon and text
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
                  // Career button as icon only
                  <motion.button
                    className="text-white hover:text-red-400 w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-300 relative overflow-hidden"
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

                    {/* Ripple effect */}
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

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-gradient-to-br from-black/95 to-[#1F1B1C]/95 backdrop-blur-lg text-white rounded-2xl mt-2 md:hidden border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              {/* Navigation Items */}
              <div className="space-y-4 mb-6">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                          active
                            ? "text-red-500 bg-red-500/10"
                            : "text-white hover:text-red-400 hover:bg-white/5"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className="flex-shrink-0"
                        >
                          <Icon size={20} />
                        </motion.div>
                        <span className="font-medium text-lg">
                          {item.label}
                        </span>

                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Items - Changed to 2 columns grid (removed Profile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="border-t border-white/10 pt-4"
              >
                <p className="text-gray-400 text-sm mb-4 font-medium">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {actionItems.map((item, index) => {
                    const Icon = item.icon;
                    const isContactButton = item.href === "/contactus";

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          <motion.button
                            className={`
                              w-full p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 relative overflow-hidden
                              ${
                                isContactButton
                                  ? "bg-white text-black shadow-lg"
                                  : "bg-white/5 text-white hover:bg-white/10 hover:text-red-400"
                              }
                            `}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              whileHover={{ rotate: isContactButton ? 15 : 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon size={20} />
                            </motion.div>
                            <span className="text-xs font-medium">
                              {item.label}
                            </span>

                            {/* Glowing effect for contact button */}
                            {isContactButton && (
                              <motion.div
                                className="absolute inset-0 bg-black/10 rounded-xl"
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </motion.button>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
