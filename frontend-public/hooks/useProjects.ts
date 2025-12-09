"use client";

import { useState, useEffect, useCallback } from "react";
import {
  projectApi,
  PublicProject,
  ProjectFilters,
  FilterOptions,
} from "@/lib/projects/projectMethods";

interface UseProjectsResult {
  projects: PublicProject[];
  total: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  filterOptions: FilterOptions | null;
  filters: ProjectFilters;
  goToPage: (page: number) => Promise<void>;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
  setFilters: (filters: ProjectFilters) => void;
}

export function useProjects(initialFilters: ProjectFilters = {}) {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // Load filter options
  const loadFilterOptions = useCallback(async () => {
    try {
      const response = await projectApi.getPublicFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error("Failed to load filter options:", err);
    }
  }, []);

  // Load projects
  const loadProjects = useCallback(
    async (page: number = 1, currentFilters: ProjectFilters = filters) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await projectApi.getPublicProjects(
          page,
          ITEMS_PER_PAGE,
          currentFilters
        );
        const data = response.data;

        setProjects(data.projects);
        setTotal(data.total);
        setHasMore(data.hasMore);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load projects";
        setError(errorMessage);
        console.error("Failed to load projects:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  // Navigate to a specific page
  const goToPage = useCallback(
    async (page: number) => {
      if (page < 1 || page > totalPages) return;
      await loadProjects(page, filters);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [loadProjects, totalPages, filters]
  );

  // Load more projects (for infinite scroll compatibility)
  const loadMore = useCallback(async () => {
    if (hasMore && currentPage < totalPages) {
      await goToPage(currentPage + 1);
    }
  }, [goToPage, hasMore, currentPage, totalPages]);

  // Refetch projects
  const refetch = useCallback(async () => {
    await loadProjects(1, filters);
  }, [loadProjects, filters]);

  // Handle filter changes
  const handleSetFilters = useCallback((newFilters: ProjectFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Load initial data
  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  // Reload projects when filters change
  useEffect(() => {
    loadProjects(1, filters);
  }, [filters, loadProjects]);

  return {
    projects,
    total,
    hasMore,
    currentPage,
    totalPages,
    isLoading,
    error,
    filterOptions,
    filters,
    goToPage,
    loadMore,
    refetch,
    setFilters: handleSetFilters,
  };
}
