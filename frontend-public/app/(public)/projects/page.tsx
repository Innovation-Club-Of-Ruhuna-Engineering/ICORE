'use client';

import { Button } from "@/components/ui/button";
import { ProjectSearchFilters } from '@/components/project/project-search-filters';
import { ProjectsGrid } from '@/components/project/projects-grid';
import { useProjects } from '@/hooks/useProjects';
import Link from 'next/link';

export default function ProjectsPage() {
  const {
    projects,
    total,
    hasMore,
    isLoading,
    error,
    filterOptions,
    filters,
    loadMore,
    setFilters: handleSetFilters,
  } = useProjects();

  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
                <span className="text-foreground">Innovation</span>{" "}
                <span className="text-primary">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                Discover groundbreaking projects from the Innovation Club of Ruhuna Engineering
              </p>
            </div>
            <Button size="lg" className="shadow-lg" asChild>
              <Link href="/new-project">
                New Project
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {filterOptions && (
          <div className="mb-8">
            <ProjectSearchFilters
              filters={filters}
              onFiltersChange={handleSetFilters}
              filterOptions={filterOptions}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Projects Grid */}
        <ProjectsGrid
          data={projects.length > 0 ? { projects, total, hasMore } : null}
          isLoading={isLoading}
          error={error}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}
