"use client";

import { User2, Briefcase, Share2, Settings } from "lucide-react";
import Card from "@/components/me/card";

interface ProfileNavigationProps {
    activeTab: number | null;
    onTabChange: (tabIndex: number) => void;
}

export function ProfileNavigation({ activeTab, onTabChange }: ProfileNavigationProps) {
    const tabs = [
        {
            id: 1,
            name: "General Info",
            icon: User2,
            description: "Basic information and contact details"
        },
        {
            id: 2,
            name: "Experience & Skills",
            icon: Briefcase,
            description: "Professional background and expertise"
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
