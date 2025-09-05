"use client";

import { User2, Briefcase, Share2, Settings } from "lucide-react";
import Card from "@/components/me/card";
import { User } from "@/types/auth/userAuthTypes";

interface ProfileNavigationProps {
    activeTab: number | null;
    onTabChange: (tabIndex: number) => void;
    user: User; // Add user prop for role-based navigation
}

export function ProfileNavigation({ activeTab, onTabChange, user }: ProfileNavigationProps) {
    // Check if user is a student or professional
    const isStudent = ['GENERAL', 'FULL', 'COMMITTEE'].includes(user.role);
    const isProfessional = ['ACADEMIC', 'INDUSTRY'].includes(user.role);

    const tabs = [
        {
            id: 1,
            name: "General Info",
            icon: User2,
            description: isStudent ? "Personal and academic information" : "Personal and professional information"
        },
        {
            id: 2,
            name: isProfessional ? "Experience & Skills" : "Academic & Skills",
            icon: Briefcase,
            description: isProfessional ? "Professional background and expertise" : "Academic progress and skills"
        },
        {
            id: 3,
            name: "Social",
            icon: Share2,
            description: "Social media links and online presence"
        },
        {
            id: 4,
            name: "Settings",
            icon: Settings,
            description: "Account settings and preferences"
        }
    ];

    return (
        <Card className="lg:sticky lg:top-8">
            <Card.Header className="font-medium text-gray-900">Edit Profile</Card.Header>
            <nav className="space-y-2 mt-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <div
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`p-3 flex items-start space-x-3 rounded-xl px-4 cursor-pointer transition-all duration-200 group ${isActive
                                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                                : "bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                                }`}
                        >
                            <Icon className={`h-5 w-5 mt-0.5 transition-colors ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                                }`} />
                            <div className="flex-1 min-w-0">
                                <div className={`font-medium transition-colors ${isActive ? "text-blue-900" : "text-gray-900"
                                    }`}>
                                    {tab.name}
                                </div>
                                <div className={`text-xs mt-0.5 transition-colors ${isActive ? "text-blue-600" : "text-gray-500"
                                    }`}>
                                    {tab.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </nav>
        </Card>
    );
}
