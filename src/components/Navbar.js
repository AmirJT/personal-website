/* Navbar - Dynamic Background on Scroll (Desktop) & Mobile Sidebar */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-4 flex items-center transition-all duration-300 ${scrolling ? "bg-gray-900 shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto flex justify-between items-center px-8 relative">
        {/* Logo - Visible on Desktop Only */}
        <Link href="/" className="absolute -top-5 left-0 -translate-x-24 hidden md:block">
          <Image src="/logo.png" alt="Logo" width={200} height={200} className="cursor-pointer drop-shadow-glow transform scale-125" />
        </Link>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex space-x-10 mx-auto">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Projects", path: "/projects" },
            { name: "Blog", path: "/blog" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="relative text-lg font-medium uppercase tracking-wide text-white transition-all duration-300 hover:text-cyan-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-cyan-300 after:left-0 after:-bottom-1 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex space-x-6 text-white text-2xl absolute right-0 pr-0">
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
            <FaLinkedin />
          </a>
          <a href="https://github.com/amirjt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
            <FaGithub />
          </a>
          <a href="mailto:ahjt28@gmail.com" className="hover:text-cyan-300 transition">
            <FaEnvelope />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-white transition-transform duration-300 hover:scale-125">
          <Menu size={40} />
        </button>
      </div>

      {/* Mobile Sidebar Menu (Half-Screen Version) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 w-3/4 h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 text-white p-10 flex flex-col items-center space-y-12 z-50 shadow-lg border-r border-cyan-500"
        >
          {/* Larger Centered Logo in Sidebar */}
          <Image src="/logo.png" alt="Logo" width={260} height={260} className="mb-8 transform scale-150" />
          
          {/* Navigation Links */}
          <div className="flex flex-col space-y-8 -mt-16">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-2xl font-semibold tracking-wide transition-all duration-300 hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Icons at Bottom */}
          <div className="flex space-x-12 text-3xl mt-auto pb-12">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/amirjt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
              <FaGithub />
            </a>
            <a href="mailto:ahjt28@gmail.com" className="hover:text-cyan-300 transition">
              <FaEnvelope />
            </a>
          </div>

          {/* Close Button (Slides Out to the Left) */}
          <button onClick={() => setIsOpen(false)} className="absolute top-0 right-4 text-white text-4xl transition hover:scale-110">
            <X size={40} />
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
