'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { blogPosts, testimonials } from "@/data/blog_testimonials_data";
import { FaQuoteLeft, FaRobot } from "react-icons/fa";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";


export default function BlogPage() {
  const canvasRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);

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

  return (
    <div className="relative w-full min-h-screen flex flex-col text-white overflow-hidden font-sans pb-32 pt-20">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
      
      {/* Blog Page Title */}
      <div className="container mx-auto p-4 md:p-10 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 drop-shadow-md mb-10">Blog & Insights</h1>
      </div>
      
      <div className="container mx-auto p-4 md:p-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Left Side - Featured Blog Post (Desktop & Mobile) */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg flex flex-col border border-cyan-500 hover:shadow-cyan-500/50">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-cyan-400">Featured Blog</h2>
          <motion.div
            key={blogPosts[0].id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
            onClick={() => setSelectedPost(blogPosts[0])}
          >
            <Image src={blogPosts[0].image} alt={blogPosts[0].title} width={600} height={350} className="rounded-lg w-full h-auto" />
            <h3 className="text-2xl md:text-3xl font-semibold text-white mt-4">{blogPosts[0].title}</h3>
            <p className="text-gray-300 mt-2">{blogPosts[0].description.substring(0, 150)}...</p>
          </motion.div>
        </div>
        
        {/* Right Side - Scrollable List of Blog Posts (Desktop Version) */}
        <div className="hidden md:block bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto border border-cyan-500 hover:shadow-cyan-500/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-cyan-400">All Posts</h2>
          <div className="space-y-4 md:space-y-6">
            {blogPosts.slice(1).map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-700 transition-all"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center space-x-4">
                  <Image src={post.image} alt={post.title} width={150} height={100} className="rounded-lg w-24 h-16 md:w-150 md:h-100" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                    <p className="text-gray-300 text-sm">{post.description.substring(0, 100)}...</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Mobile Optimized List */}
        <div className="block md:hidden bg-gray-900 p-4 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 max-h-[60vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 text-center">All Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.slice(1).map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-700 transition-all border border-cyan-400"
                onClick={() => setSelectedPost(post)}
              >
                <h3 className="text-xl font-semibold text-white text-center">{post.title}</h3>
                <p className="text-gray-300 text-sm text-center mt-2">{post.description.substring(0, 100)}...</p>
                <span className="text-cyan-400 text-sm font-semibold mt-2 block text-center hover:underline">Read More →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal for Expanded Blog Post */}
{selectedPost && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center p-4 md:p-6 z-50 overflow-y-auto min-h-screen w-full"
  >
    <div className="bg-gray-900 p-4 md:p-8 rounded-lg shadow-lg w-full max-w-5xl text-center relative max-h-[80vh] overflow-y-auto border border-cyan-500">
      <button
        onClick={() => setSelectedPost(null)}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Close
      </button>
      <Image src={selectedPost.image} alt={selectedPost.title} width={400} height={200} className="rounded-lg mx-auto w-full md:w-1/2 h-auto" />
      <h2 className="text-2xl md:text-4xl font-semibold text-white mt-4">{selectedPost.title}</h2>
      <h3 className="text-xl text-cyan-400 mt-2">{selectedPost.subheading}</h3>
      <p className="text-gray-300 mt-4">{selectedPost.fullContent.introduction}</p>
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-6">Key Takeaways</h3>
      <ul className="text-gray-300 list-disc list-inside mt-2">
        {selectedPost.fullContent.keyTakeaways.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-6">Technologies Used</h3>
      <p className="text-gray-300 mt-2">{selectedPost.fullContent.technologies.join(", ")}</p>
    </div>
  </motion.div>
)}
      {/* Call-to-Action & Testimonials Section */}
      <div className="container mx-auto mt-0 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 relative z-10 items-start">
        
        {/* Testimonials - Left Side */}
        <div className="bg-gray-900 p-4 md:p-8 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 h-full overflow-y-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-cyan-400">What Clients Say</h2>
          <motion.div className="mt-4 md:mt-6 space-y-4 md:space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-600 p-4 rounded-lg shadow-md">
                <FaQuoteLeft className="text-cyan-400 text-2xl mb-2" />
                <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
                <h3 className="text-lg font-semibold text-white mt-4">- {testimonial.name}, {testimonial.position}</h3>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Personal Developer Dashboard - Right Side (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-4 w-full">
          
          {/* Hours Spent Coding */}
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-3xl font-bold text-cyan-400">Hours Spent Coding</h2>
            <p className="text-gray-300 text-lg mt-2">~10,000+</p>
          </div>

          {/* Current Project Status with Progress */}
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-3xl font-bold text-cyan-400">Current Project</h2>
            <p className="text-gray-300 text-lg mt-2">Developing AI-powered blog UI</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
              <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* Last Blog Post with Date */}
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-3xl font-bold text-cyan-400">Last Blog Post</h2>
            <p className="text-gray-300 text-lg mt-2">AI & Web Development</p>
            <p className="text-gray-400 text-sm mt-1">Published: February 20, 2025</p>
          </div>

          {/* Upcoming Features with Animation */}
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 flex flex-col items-center text-center animate-pulse">
            <h2 className="text-xl md:text-3xl font-bold text-cyan-400">Upcoming Features</h2>
            <p className="text-gray-300 text-lg mt-2">Interactive AI blog assistant</p>
          </div>
        </div>
    </div>

       {/* Centered Image Below the 4 Boxes for Desktop, Centered for Mobile */}
       <div className="container mx-auto flex justify-center md:justify-end mt-10 md:mt-[-380px] relative z-50 md:-ml-40">
      <Image
        src="/robot.jpg"
        alt="AI Robot Illustration"
        width={350}
        height={300}
        className="rounded-lg shadow-lg"
        priority
        unoptimized
      />
    </div>

 </div>
    
  );
}
