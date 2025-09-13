"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { profileApi } from "@/lib/profile/profileMethods";


// Types
import { ProjectCard } from "@/components/shared/project-card";
import { projectApi, type PublicProject } from "@/lib/projects/projectMethods";

// Types for API error
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
  level?: string;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string; // Required for User type compatibility
  lastName: string; // Required for User type compatibility
  bio?: string;
  avatar?: string;
  coverImage?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
  institution?: string;
  company?: string;
  location?: string;
  yearsOfExperience?: number;
  role: string; // Required for User type compatibility
  status: string; // Required for User type compatibility
  createdAt: string;
  updatedAt: string;
  experiences?: Experience[];
  skills?: Skill[];
}

  // Components
import ProfileCard from "@/components/me/profile-card";

// Skeleton Loaders
import { ProfileCardSkeleton, Skeleton } from "@/components/ui/skeleton";

// Hooks
import useOption from "@/hooks/useOption";function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Horizontal tabs state
  const {
    active: horizontalTab,
    select: selectHorizontalTab
  } = useOption(2, 1); // 2 tabs: Projects (1), Blogs (2)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profileApi.getPublicProfile(username);
        setUser(response.data as UserProfile);
        setError(null);
      } catch (error) {
        const apiError = error as ApiError;
        console.error("Error fetching profile:", error);
        const errorMessage = apiError.response?.data?.message || "Failed to load profile";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        const response = await projectApi.getPublicProjectsByUsername(username);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setProjectsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
      fetchProjects();
    }
  }, [username]);

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">{error || "This profile does not exist."}</p>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="w-full">
            <ProfileCard 
              user={user} 
              onUpdate={() => {}} 
              isPublic={true}
            />
          </div>

          {/* Horizontal Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex justify-start items-center px-4" aria-label="Tabs">
                <div className="flex space-x-8">
                  <button
                    onClick={() => selectHorizontalTab(1)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      horizontalTab === 1
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => selectHorizontalTab(2)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      horizontalTab === 2
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Blogs
                  </button>
                </div>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {horizontalTab === 1 && (
                <div>
                  {projectsLoading ? (
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
                          isAdmin={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No public projects</h3>
                      <p className="text-gray-500">This user hasn't shared any projects yet.</p>
                    </div>
                  )}
                </div>
              )}

              {horizontalTab === 2 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Blogs</h3>
                  <p className="text-gray-500">Coming soon! Blog articles will appear here.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Loading skeleton for the entire page
function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <ProfileCardSkeleton />
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfilePage;