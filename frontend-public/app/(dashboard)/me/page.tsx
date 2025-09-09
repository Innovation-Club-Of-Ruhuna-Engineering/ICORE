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
// Skeleton Loaders
import {
  ProfileCardSkeleton,
  SettingsPanelSkeleton,
} from "@/components/ui/skeleton";

// Hooks
import useOption from "@/hooks/useOption";

function SelfProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [profileLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  // Separate states for horizontal and vertical tabs
  const {
    active: horizontalTab,
    select: selectHorizontalTab
  } = useOption(3, 1); // 3 horizontal tabs: Projects (1), Blogs (2), Profile (3)

  const {
    active: verticalTab,
    select: selectVerticalTab
  } = useOption(4, 1); // 4 vertical tabs for profile section

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
      //toast.success("Profile refreshed!");
    } catch (error) {
      console.error("Error refreshing profile:", error);
      toast.error("Failed to refresh profile");
    } finally {
      setRefreshing(false);
    }
  };

  const getProfileTabContent = () => {
    if (!currentUser) return null;

    switch (verticalTab) {
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

          {/* Horizontal Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex justify-between items-center px-4" aria-label="Tabs">
                <div className="flex space-x-8">
                  <button
                    onClick={() => selectHorizontalTab(1)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    horizontalTab === 1
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  My Projects
                </button>
                <button
                  onClick={() => selectHorizontalTab(2)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    horizontalTab === 2
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  My Blogs
                </button>
                <button
                  onClick={() => selectHorizontalTab(3)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    horizontalTab === 3
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  My Profile
                </button>
                </div>
                <a
                  href={`/profile/${currentUser.username}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  View Public Profile
                </a>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {horizontalTab === 1 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">My Projects</h3>
                  <p className="text-gray-500">Coming soon! You&apos;ll be able to showcase your projects here.</p>
                </div>
              )}

              {horizontalTab === 2 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">My Blogs</h3>
                  <p className="text-gray-500">Coming soon! Your blog articles will appear here.</p>
                </div>
              )}

              {horizontalTab === 3 && (
                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Left Sidebar Navigation */}
                  <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8">
                      <ProfileNavigation
                        activeTab={verticalTab}
                        onTabChange={selectVerticalTab}
                        user={currentUser}
                      />
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="lg:col-span-4">
                    {profileLoading || refreshing ? (
                      <SettingsPanelSkeleton />
                    ) : (
                      <div className="w-full">
                        {getProfileTabContent()}
                      </div>
                    )}
                  </div>
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