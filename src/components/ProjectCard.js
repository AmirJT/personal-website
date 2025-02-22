import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <Image src={project.image} alt={project.title} width={400} height={250} className="rounded-lg" />
      
      <h2 className="text-2xl font-semibold text-white mt-4">{project.title}</h2>
      
      <p className="text-gray-300 mt-2">{project.description}</p>

      <div className="flex space-x-2 mt-4">
        {project.tech.map((tech, index) => (
          <span key={index} className="bg-cyan-500 text-black px-2 py-1 rounded text-sm">{tech}</span>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <Link href={project.github} target="_blank" className="text-cyan-300 hover:text-white">
          GitHub
        </Link>
        <Link href={project.live} target="_blank" className="text-cyan-300 hover:text-white">
          Live Demo
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;