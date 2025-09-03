"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "@/contexts/userAuthContext";
import { profileApi } from "@/lib/profile/profileMethods";

// New Modular Components
import ProfileCard from "@/components/me/profile-card";
import { ProfileNavigation } from "@/components/me/profile-navigation";
import { GeneralInfoSection } from "@/components/me/general-info-section";
import { ExperienceSkillsSection } from "@/components/me/experience-skills-section";
import { SocialSection } from "@/components/me/social-section";
import { SettingsSection } from "@/components/me/settings-section";
import { ProjectsSection } from "@/components/me/projects-section";

// Skeleton Loaders
import {
  ProfileCardSkeleton,
  SettingsPanelSkeleton,
} from "@/components/ui/skeleton";

// Hooks
import useOption from "@/hooks/useOption";

type TabType = 'general' | 'experience' | 'social' | 'settings';

function SelfProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const {
    active,
    select,
    factory,
    options: [general, experience, social, settings],
  } = useOption(4, 1);

  // Update local user state when auth user changes
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  // Refresh user profile data
  const refreshProfile = async () => {
    try {
      setRefreshing(true);
      const response = await profileApi.getProfile();
      setCurrentUser(response.data);
      toast.success("Profile refreshed!");
    } catch (error) {
      console.error("Error refreshing profile:", error);
      toast.error("Failed to refresh profile");
    } finally {
      setRefreshing(false);
    }
  };

  const getTabContent = () => {
    if (!currentUser) return null;

    switch (active) {
      case 1:
        return <GeneralInfoSection user={currentUser} onUpdate={refreshProfile} />;
      case 2:
        return <ExperienceSkillsSection user={currentUser} onUpdate={refreshProfile} />;
      case 3:
        return <SocialSection user={currentUser} onUpdate={refreshProfile} />;
      case 4:
        return <SettingsSection user={currentUser} onUpdate={refreshProfile} />;
      default:
        return <GeneralInfoSection user={currentUser} onUpdate={refreshProfile} />;
    }
  };

  if (authLoading) {
    return <ProfilePageSkeleton />;
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">

          {/* Full-Width LinkedIn-Style Profile Card */}
          <div className="w-full">
            {profileLoading ? (
              <ProfileCardSkeleton />
            ) : (
              <ProfileCard user={currentUser} onUpdate={refreshProfile} />
            )}
          </div>

          {/* Projects Section - Full Width */}
          <ProjectsSection
            loading={profileLoading}
            onCreateProject={() => toast.success("Create project feature coming soon!")}
            onEditProject={(project) => toast.success(`Edit ${project.title} coming soon!`)}
            onDeleteProject={(projectId) => toast.success("Delete project feature coming soon!")}
          />

          {/* Profile Management Section */}
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <ProfileNavigation
                  activeTab={active || 1}
                  onTabChange={select}
                />
              </div>
            </div>

            {/* Main Content Area - 4 columns for spacious layout */}
            <div className="lg:col-span-4">
              {profileLoading || refreshing ? (
                <SettingsPanelSkeleton />
              ) : (
                <div className="w-full">
                  {getTabContent()}
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
          {/* Profile Card Skeleton */}
          <div className="w-full">
            <ProfileCardSkeleton />
          </div>

          {/* Projects Section Skeleton */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Section Skeleton */}
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <SettingsPanelSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfProfilePage;