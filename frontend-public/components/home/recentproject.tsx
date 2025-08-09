import React from "react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const recentProjects: Project[] = [
  {
    id: 1,
    title: "Drone Project",
    description: "",
    imageUrl: "ProjectCard.png",
    link: "#",
  },
  {
    id: 2,
    title: "Drone Project",
    description: "",
    imageUrl: "ProjectCard.png",
    link: "#",
  },
  {
    id: 3,
    title: "Drone Project",
    description: "",
    imageUrl: "ProjectCard.png",
    link: "#",
  },
  {
    id: 4,
    title: "Drone Project",
    description: "",
    imageUrl: "ProjectCard.png",
    link: "#",
  },
  {
    id: 5,
    title: "Drone Project",
    description: "",
    imageUrl: "ProjectCard.png",
    link: "#",
  },
  {
    id: 6,
    title: "Drone Project",
    description: "",
    imageUrl: "ProjectCard.png",
    link: "#",
  },
];

const RecentProjectSection: React.FC = () => (
  <section className="w-full max-w-7xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-semibold mb-6 text-black">Recent Projects</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recentProjects.map((project) => (
        <div
          key={project.id}
          className="relative rounded-lg overflow-hidden shadow-md group"
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold">{project.title}</h3>
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-center gap-4 mt-8">
      <Link href="#">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
          Explore
        </button>
      </Link>
      <Link href="#">
        <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
          Join Us
        </button>
      </Link>
    </div>
  </section>
);

export default RecentProjectSection;