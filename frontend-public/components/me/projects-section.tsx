"use client";

import { useState } from "react";
import { Plus, ExternalLink, Github, Edit, Trash2 } from "lucide-react";
import ProjectCard from "@/components/project/project-card";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    githubUrl?: string;
    liveUrl?: string;
    technologies?: string[];
}

interface ProjectsSectionProps {
    projects?: Project[];
    loading?: boolean;
    onCreateProject?: () => void;
    onEditProject?: (project: Project) => void;
    onDeleteProject?: (projectId: string) => void;
}

export function ProjectsSection({
    projects = [],
    loading = false,
    onCreateProject,
    onEditProject,
    onDeleteProject,
}: ProjectsSectionProps) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Mock data for demonstration
    const mockProjects: Project[] = [
        {
            id: "1",
            title: "Portfolio Website",
            description: "A modern portfolio built using React and TailwindCSS showcasing my projects and skills.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
            githubUrl: "https://github.com/user/portfolio",
            liveUrl: "https://portfolio.example.com",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
        },
        {
            id: "2",
            title: "Task Manager App",
            description: "A productivity application to manage daily tasks efficiently with real-time collaboration.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
            githubUrl: "https://github.com/user/task-manager",
            liveUrl: "https://tasks.example.com",
            technologies: ["Next.js", "Prisma", "PostgreSQL"],
        },
        {
            id: "3",
            title: "E-commerce Platform",
            description: "A full-stack e-commerce solution with payment integration and admin dashboard.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
            githubUrl: "https://github.com/user/ecommerce",
            technologies: ["React", "Node.js", "Stripe"],
        },
    ];

    const displayProjects = projects.length > 0 ? projects : mockProjects;

    return (
        <div className="bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] py-6 px-5">
            <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-semibold">My Projects</h2>
                <button
                    onClick={onCreateProject}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    New Project
                </button>
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))}
                </div>
            ) : displayProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProjects.map((project) => (
                        <div
                            key={project.id}
                            className="relative group"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <EnhancedProjectCard
                                project={project}
                                showActions={hoveredProject === project.id}
                                onEdit={() => onEditProject?.(project)}
                                onDelete={() => onDeleteProject?.(project.id)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Plus className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-500 mb-4">Start building your portfolio by adding your first project</p>
                    <button
                        onClick={onCreateProject}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Create Your First Project
                    </button>
                </div>
            )}
        </div>
    );
}

interface EnhancedProjectCardProps {
    project: Project;
    showActions?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

function EnhancedProjectCard({ project, showActions, onEdit, onDelete }: EnhancedProjectCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative">
            {/* Action Buttons Overlay */}
            {showActions && (
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        title="Edit Project"
                    >
                        <Edit className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        title="Delete Project"
                    >
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                </div>
            )}

            <div className="relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md font-medium">
                                +{project.technologies.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Action Links */}
                <div className="flex gap-3">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
