'use client';

import React, { useState, useEffect } from 'react';
import { Project, ProjectFilters } from '@/lib/types';
import { projectsApi, ApiError } from '@/lib/api';
import { ProjectCard } from './ui/ProjectCard';
import { SearchBar } from './ui/SearchBar';
import { Sidebar } from './ui/SideBar';
import { Navbar } from './ui/Navbar';

const dummyProjects: Project[] = [
  {
    id: 1,
    name: "Smart Home Automation System",
    description: "An IoT-based home automation system that allows users to control lights, temperature, and security systems remotely through a mobile app. Features include voice control, scheduling, and energy monitoring.",
    field: "electrical",
    author: "Alice Johnson",
    authorAvatar: "",
    imageUrl: "",
    tags: ["IoT", "Arduino", "Mobile App", "Home Automation", "Sensors"],
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20"
  },
  {
    id: 2,
    name: "Solar Panel Tracking System",
    description: "A dual-axis solar panel tracking system that automatically follows the sun's movement to maximize energy generation. Includes weather monitoring and automatic storm protection features.",
    field: "electrical",
    author: "Bob Smith",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Solar Energy", "Renewable", "Tracking", "Automation", "Green Tech"],
    createdAt: "2024-03-10",
    updatedAt: "2024-03-18"
  },
  {
    id: 3,
    name: "Telescope Mount Controller",
    description: "A precision motorized mount controller for telescopes with GPS synchronization and star tracking capabilities. Perfect for astrophotography and automated celestial observations.",
    field: "marine",
    author: "Dr. Sarah Wilson",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Telescope", "GPS", "Star Tracking", "Astrophotography", "Motors"],
    createdAt: "2024-03-05",
    updatedAt: "2024-03-12"
  },
  {
    id: 4,
    name: "Automated Plant Watering System",
    description: "A smart irrigation system that monitors soil moisture, weather conditions, and plant health to provide optimal watering schedules. Includes mobile notifications and water usage tracking.",
    field: "mechanical",
    author: "Mike Chen",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Agriculture", "IoT", "Sensors", "Automation", "Water Management"],
    createdAt: "2024-02-28",
    updatedAt: "2024-03-08"
  },
  {
    id: 5,
    name: "Traffic Flow Optimization Model",
    description: "A machine learning model that analyzes traffic patterns and optimizes signal timing to reduce congestion in urban areas. Includes real-time monitoring and adaptive algorithms.",
    field: "civil",
    author: "Emma Rodriguez",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Traffic", "Machine Learning", "Urban Planning", "Optimization", "Smart City"],
    createdAt: "2024-02-20",
    updatedAt: "2024-03-01"
  },
  {
    id: 6,
    name: "Robotic Arm for Assembly Line",
    description: "A 6-DOF robotic arm designed for precision assembly tasks in manufacturing. Features computer vision for quality control and adaptive gripping for various components.",
    field: "mechanical",
    author: "James Park",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Robotics", "Manufacturing", "Computer Vision", "Automation", "Assembly"],
    createdAt: "2024-02-15",
    updatedAt: "2024-02-25"
  },
  {
    id: 7,
    name: "Exoplanet Detection Algorithm",
    description: "An advanced algorithm for detecting exoplanets using transit photometry data from space telescopes. Implements machine learning techniques to reduce false positives.",
    field: "computer",
    author: "Dr. Lisa Thompson",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Exoplanets", "Machine Learning", "Space", "Data Analysis", "Transit Method"],
    createdAt: "2024-02-10",
    updatedAt: "2024-02-20"
  },
  {
    id: 8,
    name: "Smart Grid Energy Management",
    description: "An intelligent energy management system for smart grids that optimizes power distribution, integrates renewable sources, and provides real-time consumption analytics.",
    field: "electrical",
    author: "David Lee",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Smart Grid", "Energy", "Renewable", "Analytics", "Power Distribution"],
    createdAt: "2024-02-05",
    updatedAt: "2024-02-15"
  },
  {
    id: 9,
    name: "Earthquake Early Warning System",
    description: "A seismic monitoring network that provides early earthquake warnings to communities. Uses distributed sensors and machine learning for rapid detection and alert dissemination.",
    field: "civil",
    author: "Dr. Maria Garcia",
    authorAvatar: "",
    imageUrl: "",
    tags: ["Seismic", "Early Warning", "Sensors", "Machine Learning", "Public Safety"],
    createdAt: "2024-01-30",
    updatedAt: "2024-02-10"
  }
];

interface ProjectCardsProps {
  user?: {
    name: string;
    avatar?: string;
  };
}

export const ProjectCards: React.FC<ProjectCardsProps> = ({ user }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProjectFilters>({
    electrical: true,
    marine: true,
    mechanical: true,
    civil: true,
    computer: true
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsApi.getProjects();
        const projectsToUse = response.projects && response.projects.length > 0 
          ? response.projects 
          : dummyProjects;
          
        setProjects(projectsToUse);
        setFilteredProjects(projectsToUse);
      } catch (err) {
        console.warn('API failed, using dummy projects:', err);
        setProjects(dummyProjects);
        setFilteredProjects(dummyProjects);
        if (err instanceof ApiError) {
          setError(`API Error ${err.status}: ${err.message} (showing dummy data)`);
        } else {
          setError('Failed to fetch projects from API (showing dummy data)');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesField = filters[project.field];
      return matchesSearch && matchesField;
    });
    setFilteredProjects(filtered);
  }, [searchTerm, filters, projects]);

  const handleFilterChange = (field: keyof ProjectFilters) => {
    setFilters(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleViewProject = (id: number) => {
    window.location.href = `/projects/${id}`;
  };

  const handleAddProject = () => {
    window.location.href = '/projects/new';
  };

  const handleSearch = () => {
    console.log('Search performed:', searchTerm);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} currentPage="projects" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-8">
          <Sidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onAddProject={handleAddProject}
          />

          <div className="flex-1">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
            />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{filteredProjects.length} Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Order By:</span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option value="relevance">Relevance</option>
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onViewProject={handleViewProject}
                />
              ))}
            </div>
            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;