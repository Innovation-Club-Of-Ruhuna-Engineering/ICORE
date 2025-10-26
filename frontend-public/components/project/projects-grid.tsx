'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/shared/project-card';
import { PublicProject, PublicProjectsResponse } from '@/lib/projects/projectMethods';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProjectsGridProps {
  data: PublicProjectsResponse | null;
  isLoading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
  isAdmin?: boolean;
  onToggleVisibility?: (projectId: string, isVisible: boolean) => void;
}

export function ProjectsGrid({ 
  data, 
  isLoading, 
  error, 
  onLoadMore, 
  hasMore,
  isAdmin = false,
  onToggleVisibility
}: ProjectsGridProps) {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

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

      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            className="min-w-32"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {data.projects.length} of {data.total} projects
      </div>
    </div>
  );
}

