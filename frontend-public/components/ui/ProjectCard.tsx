import React from 'react';
import { User } from 'lucide-react';
import { Project } from '@/lib/types';
import { getFieldColor, truncateText } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onViewProject: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewProject }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Project Image */}
      <div className="h-40 bg-gray-200 rounded-t-lg relative overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No Image</span>
          </div>
        )}
        
        {/* Field Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getFieldColor(project.field)}`}>
            {project.field.charAt(0).toUpperCase() + project.field.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {truncateText(project.description, 120)}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Author and Action */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              {project.authorAvatar ? (
                <img src={project.authorAvatar} alt={project.author} className="w-6 h-6 rounded-full" />
              ) : (
                <User className="w-3 h-3 text-gray-600" />
              )}
            </div>
            <span className="text-gray-600 text-sm">{project.author}</span>
          </div>
          <button 
            onClick={() => onViewProject(project.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};