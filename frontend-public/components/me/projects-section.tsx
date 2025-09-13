"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/shared/project-card";
import { projectApi, type PublicProject } from "@/lib/projects/projectMethods";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectsSectionProps {
    userId: string;
}

export function ProjectsSection({ userId }: ProjectsSectionProps) {
    const [projects, setProjects] = useState<PublicProject[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const response = await projectApi.getUserProjects(userId);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [userId]);

    const handleVisibilityToggle = async (projectId: string, isVisible: boolean) => {
        try {
            await projectApi.updateProject(projectId, { isVisible });
            toast.success(`Project visibility ${isVisible ? 'enabled' : 'disabled'}`);
            // Refresh projects after update
            fetchProjects();
        } catch (error) {
            console.error('Error updating project visibility:', error);
            toast.error('Failed to update project visibility');
        }
    };

    return (
        <div>
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="space-y-3">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : projects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isAdmin={true}
                            onToggleVisibility={handleVisibilityToggle}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-500">Start building your portfolio by adding your first project</p>
                </div>
            )}
        </div>
    );
}


