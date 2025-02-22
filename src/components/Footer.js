"use client";
const Footer = ({ isNavbarOpen }) => {
  return (
    <footer 
      className={`bg-gradient-to-t from-gray-950 to-black text-center p-4 text-white border-t border-gray-700 w-full fixed bottom-0 left-0 flex flex-col items-center space-y-2 z-50 transition-all duration-300 ${isNavbarOpen ? 'hidden' : 'flex'}`}
    >
      <div className="relative space-x-4 pointer-events-auto">
        <a 
          href="https://www.linkedin.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-cyan-400 transition cursor-pointer"
        >
          LinkedIn
        </a>
        <a 
          href="https://github.com/amirjt" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-cyan-400 transition cursor-pointer"
        >
          GitHub
        </a>
        <a 
          href="mailto:ahjt28@gmail.com" 
          className="hover:text-cyan-400 transition cursor-pointer"
        >
          Email
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Amir JT. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
