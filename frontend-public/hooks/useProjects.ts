'use client';

import { useState, useEffect, useCallback } from 'react';
import { projectApi, PublicProject, ProjectFilters, FilterOptions } from '@/lib/projects/projectMethods';

interface UseProjectsResult {
  projects: PublicProject[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  filterOptions: FilterOptions | null;
  filters: ProjectFilters;
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
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Load filter options
  const loadFilterOptions = useCallback(async () => {
    try {
      const response = await projectApi.getPublicFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Failed to load filter options:', err);
    }
  }, []);

  // Load projects
  const loadProjects = useCallback(async (page: number = 1, resetProjects: boolean = true, currentFilters: ProjectFilters = filters) => {
    try {
      if (resetProjects) {
        setIsLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      const response = await projectApi.getPublicProjects(page, ITEMS_PER_PAGE, currentFilters);
      const data = response.data;

      if (resetProjects) {
        setProjects(data.projects);
        setCurrentPage(1);
      } else {
        setProjects(prev => [...prev, ...data.projects]);
      }

      setTotal(data.total);
      setHasMore(data.hasMore);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load projects';
      setError(errorMessage);
      console.error('Failed to load projects:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Load more projects
  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore) {
      await loadProjects(currentPage + 1, false, filters);
    }
  }, [loadProjects, currentPage, hasMore, isLoadingMore, filters]);

  // Refetch projects
  const refetch = useCallback(async () => {
    await loadProjects(1, true, filters);
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
    loadProjects(1, true, filters);
  }, [filters]);

  return {
    projects,
    total,
    hasMore,
    isLoading,
    error,
    filterOptions,
    filters,
    loadMore,
    refetch,
    setFilters: handleSetFilters,
  };
}

