/* Projects Page - Enhanced UI with Effects, Spacing & Scroll Fix */
"use client";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "DJ TAAHAA",
    description: "A custom website for my client, a professional DJ. Designed to increase online visibility, drive traffic, and expand his brand reach exponentially.",
    image: "/djtaahaa.png",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    github: "https://github.com/AmirJT/DJTAAHAA",
    live: "https://djtaahaa.com",
    category: "Full-Stack",
  },
  {
    id: 2,
    title: "Spotify Playlist Generator",
    description: "An AI-powered Spotify playlist generator that curates personalized playlists based on user preferences, mood, and trending music. Built with a full-stack architecture.",
    image: "/spotify-generator.png",
    tech: ["React", "SQL", "Node.js", "Express.js"],
    github: "https://github.com/AmirJT/spotify-2.0",
    live: "https://spotify-generator.com",
    category: "AI",
  },
  {
    id: 3,
    title: "Candidate Scroller",
    description: "A recruitment platform that allows companies to efficiently browse and filter through potential candidates based on AI-driven recommendations and job preferences.",
    image: "/candidate-scroller.png",
    tech: ["React", "SQL", "Node.js", "Express.js"],
    github: "https://github.com/AmirJT/canidatescroller",
    live: "https://candidatescroller.com",
    category: "Full-Stack",
  },
];

const categories = ["All", "Full-Stack", "AI", "Frontend"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const canvasRef = useRef(null);

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
      gradient.addColorStop(0, "#0A192F"); // Deep Blue
      gradient.addColorStop(0.5, "#020C1B"); // Darker Blue
      gradient.addColorStop(1, "#010A14"); // Almost Black
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      gradientStep += 0.002;
      requestAnimationFrame(animateGradient);
    }

    animateGradient();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="relative w-full min-h-screen flex flex-col text-white overflow-hidden font-mono pb-32">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
      <div className="container mx-auto p-10 relative z-10 mt-16">
        {/* Animated Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-center mb-12 text-cyan-400 drop-shadow-md"
        >
          My Projects
        </motion.h1>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center space-x-6 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-lg transition-all duration-300 text-lg font-semibold shadow-lg ${
                selectedCategory === category
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-700 text-white hover:bg-cyan-500 hover:text-black"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid with Animations */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}