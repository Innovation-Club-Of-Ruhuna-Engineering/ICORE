// components/ui/Sidebar.tsx - Sidebar filter component

import React from 'react';
import { Plus } from 'lucide-react';
import { ProjectFilters } from '@/lib/types';

interface SidebarProps {
  filters: ProjectFilters;
  onFilterChange: (field: keyof ProjectFilters) => void;
  onAddProject: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, onAddProject }) => {
  const commonTags = ['Web', 'Machine Learning', 'Manufacturing', 'Blockchain', 'Research', 'Analysis'];

  return (
    <div className="w-64 flex-shrink-0">
      {/* Add Project Button */}
      <button 
        onClick={onAddProject}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 mb-6 hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Project</span>
      </button>

      {/* Fields Filter */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Fields</h3>
        <div className="space-y-2">
          {Object.entries(filters).map(([field, checked]) => (
            <label key={field} className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onFilterChange(field as keyof ProjectFilters)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{field}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {commonTags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};