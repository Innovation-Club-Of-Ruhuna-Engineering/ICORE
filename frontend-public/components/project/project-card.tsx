// components/project/ProjectCard.tsx

import Image from "next/image";

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        image: string;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Image
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
                width={640}
                height={256}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
            </div>
        </div>
    );
}
