'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { ProjectFilters, FilterOptions } from '@/lib/projects/projectMethods';

interface ProjectSearchFiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  filterOptions: FilterOptions;
  isLoading?: boolean;
}

export function ProjectSearchFilters({ 
  filters, 
  onFiltersChange, 
  filterOptions, 
  isLoading = false 
}: ProjectSearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || '');

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchValue || undefined });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]); // Only depend on searchValue to avoid infinite loop

  const handleFilterChange = (key: keyof ProjectFilters, value: string | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleArrayFilterChange = (key: 'tags' | 'technologies', value: string, checked: boolean) => {
    const currentArray = filters[key] || [];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    onFiltersChange({ 
      ...filters, 
      [key]: newArray.length > 0 ? newArray : undefined 
    });
  };

  const clearFilters = () => {
    setSearchValue('');
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search projects by name or description..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-4"
          disabled={isLoading}
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleToggleFilters}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {Object.values(filters).filter(value => 
                value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
              ).length}
            </Badge>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Options */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Project Type Filter */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Project Type</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select
                  value={filters.type || undefined}
                  onValueChange={(value) => handleFilterChange('type', value || undefined)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Status Filter */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select
                  value={filters.status || undefined}
                  onValueChange={(value) => handleFilterChange('status', value || undefined)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Sort By */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sort By</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select
                  value={filters.sortBy || 'createdAt'}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date Created</SelectItem>
                    <SelectItem value="name">Project Name</SelectItem>
                    <SelectItem value="startDate">Start Date</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Sort Order */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Order</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select
                  value={filters.sortOrder || 'desc'}
                  onValueChange={(value) => handleFilterChange('sortOrder', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Tags Filter */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="max-h-32 overflow-y-auto space-y-2">
                {filterOptions.tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={filters.tags?.includes(tag) || false}
                      onCheckedChange={(checked) => 
                        handleArrayFilterChange('tags', tag, checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technologies Filter */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Technologies</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="max-h-32 overflow-y-auto space-y-2">
                {filterOptions.technologies.map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tech-${tech}`}
                      checked={filters.technologies?.includes(tech) || false}
                      onCheckedChange={(checked) => 
                        handleArrayFilterChange('technologies', tech, checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <label
                      htmlFor={`tech-${tech}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tech}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.type}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('type', undefined)}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('status', undefined)}
              />
            </Badge>
          )}
          {filters.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleArrayFilterChange('tags', tag, false)}
              />
            </Badge>
          ))}
          {filters.technologies?.map((tech) => (
            <Badge key={tech} variant="secondary" className="flex items-center gap-1">
              {tech}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleArrayFilterChange('technologies', tech, false)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

