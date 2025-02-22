/* src/app/page.js */
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const canvasRef = useRef(null);
  const [step, setStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const chatMessages = [
    "Hello, traveler... Welcome to my digital universe.",
    "I am JaayTea, your AI guide. I’m here to assist you.",
    "You seem new here. Let me show you around.",
    "Did you know AI can't drink coffee? It's a real tragedy.",
    "If I had a dollar for every bug I debugged... well, I'd still be an AI with no wallet.",
    "Hold on, calculating the meaning of life... nope, still 42.",
    "Are you lost, or did you just take a wrong turn in cyberspace?",
    "What brings you to this part of the universe?"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#02010a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });
      requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    chatMessages.forEach((msg, index) => {
      setTimeout(() => {
        setStep(index + 1);
        if (index === chatMessages.length - 1) {
          setTimeout(() => setShowOptions(true), 3000);
        }
      }, (index + 1) * 5000);
    });
  }, []);

  const glitchEffect = {
    textShadow: "2px 2px 4px rgba(255, 0, 150, 0.7), -2px -2px 4px rgba(0, 255, 255, 0.7)"
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between text-white overflow-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
      
      {/* Left-side rocket animation */}
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: "-100vh" }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute left-10 bottom-0 w-32 h-32"
      >
        <Image src="/rocket.png" alt="Rocket Left" width={128} height={128} />
      </motion.div>
      
      {/* Right-side rocket animation */}
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: "-100vh" }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear", delay: 4 }}
        className="absolute right-10 bottom-0 w-32 h-32"
      >
        <Image src="/rocket.png" alt="Rocket Right" width={150} height={128} />
      </motion.div>
      
      <div className="relative flex flex-col items-center justify-center flex-grow p-6">
        {chatMessages.map((msg, index) => (
          step === index + 1 && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-xl md:text-2xl text-center"
              style={glitchEffect}
            >
              <Typewriter
                words={[msg]}
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={1000}
              />
            </motion.div>
          )
        ))}
        
        {showOptions && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            className="flex flex-col space-y-4 mt-6"
          >
            {["I want to see your projects", "Tell me about yourself", "How can I contact you?"].map((option, index) => (
              <motion.div
                key={index}
                className="text-lg md:text-2xl text-cyan-400 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 1, duration: 1 }}
                whileHover={{ scale: 1.1 }}
                style={glitchEffect}
                onClick={() => {
                  if (index === 0) router.push("/projects");
                  if (index === 1) router.push("/about");
                  if (index === 2) router.push("/contact");
                }}
              >
                {option}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
