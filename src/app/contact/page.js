"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Typewriter } from "react-simple-typewriter";

export default function ContactPage() {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();

    function animateGradient() {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0A192F"); // Deep Blue
      gradient.addColorStop(0.5, "#020C1B"); // Darker Blue
      gradient.addColorStop(1, "#010A14"); // Almost Black
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animateGradient);
    }

    function animateStars() {
      const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
      }));

      function drawStars() {
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
        requestAnimationFrame(drawStars);
      }
      drawStars();
    }

    if (successMessage) {
      animateStars();
    } else {
      animateGradient();
    }

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [successMessage]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs.sendForm("service_113100", "template_e7mspv7", e.target, "mDTxveovZohoOYAzQ")
      .then(
        () => {
          setSuccessMessage(true);
          setErrorMessage("");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSending(false);
        },
        () => {
          setErrorMessage("Failed to send message. Please try again.");
          setSuccessMessage(false);
          setIsSending(false);
        }
      );
  };

  return (
    <div className={`relative w-full min-h-screen flex flex-col text-white overflow-hidden font-sans pb-32 pt-20`}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
      
      {/* AI Typing Effect Intro */}
      {!successMessage && (
        <div className="container mx-auto p-6 text-center z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-cyan-400 drop-shadow-md"
          >
            <Typewriter
              words={["Let's Connect!", "Have a question or project in mind?", "Send me a message!"]}
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </motion.h1>
        </div>
      )}
      
      {/* Contact Form Section */}
      {!successMessage ? (
        <div className="container mx-auto p-8 max-w-2xl text-white z-10">
          <form onSubmit={sendEmail} className="bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-500">
            <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 mt-2 text-black rounded-lg bg-gray-300 focus:ring-2 focus:ring-cyan-500" />
            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 mt-2 text-black rounded-lg bg-gray-300 focus:ring-2 focus:ring-cyan-500" />
            <input type="text" name="subject" placeholder="Subject" required className="w-full p-3 mt-2 text-black rounded-lg bg-gray-300 focus:ring-2 focus:ring-cyan-500" />
            <textarea name="message" placeholder="Your Message" required rows="5" className="w-full p-3 mt-2 text-black rounded-lg bg-gray-300 focus:ring-2 focus:ring-cyan-500"></textarea>
            <button type="submit" className="w-full p-3 mt-4 font-semibold text-white bg-cyan-500 rounded-lg hover:bg-cyan-400 transition" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
            {errorMessage && <p className="text-red-400 text-center mt-4">{errorMessage}</p>}
          </form>
        </div>
      ) : (
        /* Space-Themed "THANK YOU" Popout */
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black text-red-500 text-6xl font-extrabold animate-pulse">
          <h1>THANK YOU ❤️</h1>
        </div>
      )}
    </div>
  );
}
