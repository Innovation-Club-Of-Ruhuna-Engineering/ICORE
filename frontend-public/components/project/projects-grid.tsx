"use client";

import { ProjectCard } from "@/components/shared/project-card";
import { PublicProjectsResponse } from "@/lib/projects/projectMethods";
import { Pagination } from "@/components/ui/pagination";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProjectsGridProps {
  data: PublicProjectsResponse | null;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  hasMore: boolean;
  isAdmin?: boolean;
  onToggleVisibility?: (projectId: string, isVisible: boolean) => void;
}

export function ProjectsGrid({
  data,
  isLoading,
  error,
  onPageChange,
  hasMore,
  isAdmin = false,
  onToggleVisibility,
}: ProjectsGridProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  console.log("Rendering ProjectsGrid with data:", data);

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  if (!data || data.projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isAdmin={isAdmin}
            onToggleVisibility={onToggleVisibility}
          />
        ))}
      </div>

      {/* Pagination Controls */}

      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />

      {/* Results Count */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {data.projects.length} of {data.total} projects
      </div>
    </div>
  );
}
