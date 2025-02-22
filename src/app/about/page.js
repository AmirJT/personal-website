/* About Page - Fullscreen Abstract Fading Gradient Background with Fixes */
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

export default function About() {
  const canvasRef = useRef(null);
  const [showTabs, setShowTabs] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showAIMessage, setShowAIMessage] = useState(false);
  const bioSections = {
    "Who I Am": "I am an AI-driven developer passionate about crafting futuristic digital experiences. My journey into web development began with a love for technology and design, leading me to specialize in AI-driven web applications and immersive user interfaces.",
    "What I Do": "I specialize in developing interactive and futuristic web experiences, integrating AI with modern web technologies to push the boundaries of digital interactions. From AI chatbots to 3D web designs, I create projects that blend innovation with usability.",
    "My Skills & Technologies": "I work with cutting-edge technologies including React, Next.js, Three.js, Tailwind CSS, Framer Motion, and AI-based tools like OpenAI APIs and TensorFlow. I believe in staying ahead of the curve with modern tech stacks.",
    "Fun Fact": "If AI could dream, I'd be dreaming in cyberpunk neon and futuristic code streams. Also, I can code an entire app but still struggle to decide what to eat for dinner!"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    let gradientStep = 0;
    function animateGradient() {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(30,30,30,0.9)`);
      gradient.addColorStop(0.5, `rgba(10,10,10,0.9)`);
      gradient.addColorStop(1, `rgba(0,0,0,1)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      gradientStep += 0.002;
      requestAnimationFrame(animateGradient);
    }

    animateGradient();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowAIMessage(true), 1000);
    setTimeout(() => setShowTabs(true), 8000);
    setTimeout(() => setShowBackButton(true), 7000);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col text-white overflow-hidden font-mono justify-between pb-20 pt-0">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
      <div className="flex flex-col md:flex-row flex-grow items-center justify-center relative z-10">
        {/* Image on top for mobile, left for desktop */}
        <div className="w-full md:w-1/2 h-auto md:h-full relative flex items-center justify-center overflow-hidden">
          <Image
            src="/aipic.jpg"
            alt="AI Avatar"
            layout="intrinsic"
            width={800}
            height={600}
            className="object-contain"
          />
        </div>
        
        {/* Right Side - AI Chat Popup and Options */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10 relative text-center md:text-left">
          {/* AI Pop-up Message with Typing Effect as a Single Paragraph */}
          {showAIMessage && !showTabs && !activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl"
            >
              <Typewriter
                words={["Hey, how are you? Hope you're not tired yet, still a long way to go! Hahaha. What do you wanna know about me?"]}
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={500}
              />
            </motion.div>
          )}
          
          {/* Option Tabs - Glitch in after AI Message */}
          {showTabs && !activeSection && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex flex-col space-y-4"
            >
              {Object.keys(bioSections).map((section, index) => (
                <motion.button
                  key={index}
                  className="text-white text-lg md:text-2xl shadow-lg transition about-tab border border-cyan-500 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-cyan-500 hover:text-black bg-transparent cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  onClick={() => setActiveSection(section)}
                >
                  <Typewriter
                    words={[section]}
                    typeSpeed={30}
                    deleteSpeed={15}
                    delaySpeed={800}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      {/* Info Box Positioned on the Right Side */}
      {activeSection && (
        <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  className="relative w-full max-w-[90%] md:absolute md:w-1/2 md:right-10 md:top-1/3 md:transform md:-translate-y-1/3 p-4 md:p-8 text-lg md:text-2xl text-center flex flex-col items-center justify-center rounded-lg shadow-lg z-50 mt-[-90px] md:mt-0 ml-4"
>
          <Typewriter
            words={[bioSections[activeSection]]}
            typeSpeed={30}
            deleteSpeed={15}
            delaySpeed={1200}
          />
          {showBackButton && (
            <button
              className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg text-lg md:text-xl transition cursor-pointer"
              onClick={() => setActiveSection(null)}
            >
              Back
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
