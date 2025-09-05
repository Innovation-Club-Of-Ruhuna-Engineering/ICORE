"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Globe, Github, Linkedin, Youtube, Instagram, Twitter, Save, Loader2 } from "lucide-react";
import { profileApi } from "@/lib/profile/profileMethods";
import Card from "@/components/me/card";
import { User } from "@/types/auth/userAuthTypes";

interface SocialSectionProps {
    user: User;
    onUpdate: () => void;
}

export function SocialSection({ user, onUpdate }: SocialSectionProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        website: user?.website || "",
        github: user?.github || "",
        linkedin: user?.linkedin || "",
        youtube: user?.youtube || "",
        instagram: user?.instagram || "",
        twitter: user?.twitter || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await profileApi.updateProfile(formData);
            toast.success("Social links updated successfully!");
            onUpdate();
        } catch (error) {
            console.error("Error updating social links:", error);
            toast.error("Failed to update social links. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const socialFields = [
        {
            id: "website",
            label: "Website",
            placeholder: "https://yourwebsite.com",
            icon: Globe,
            description: "Your personal or professional website"
        },
        {
            id: "github",
            label: "GitHub",
            placeholder: "https://github.com/username",
            icon: Github,
            description: "Your GitHub profile for code repositories"
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            placeholder: "https://linkedin.com/in/username",
            icon: Linkedin,
            description: "Your professional LinkedIn profile"
        },
        {
            id: "youtube",
            label: "YouTube",
            placeholder: "https://youtube.com/@username",
            icon: Youtube,
            description: "Your YouTube channel"
        },
        {
            id: "instagram",
            label: "Instagram",
            placeholder: "https://instagram.com/username",
            icon: Instagram,
            description: "Your Instagram profile"
        },
        {
            id: "twitter",
            label: "Twitter/X",
            placeholder: "https://twitter.com/username",
            icon: Twitter,
            description: "Your Twitter/X profile"
        }
    ];

    return (
        <Card className="flex flex-1">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Card.Header>Social Media Links</Card.Header>
                    <p className="text-gray-600 text-sm mt-1">
                        Connect your social media profiles to showcase your online presence
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialFields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div key={field.id} className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-gray-500" />
                                <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                            </div>
                            <input
                                type="url"
                                id={field.id}
                                placeholder={field.placeholder}
                                value={formData[field.id as keyof typeof formData]}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500">{field.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Pro Tip</span>
                </div>
                <p className="text-sm text-blue-700">
                    Adding social media links helps others connect with you and discover your work.
                    Make sure your profiles are up-to-date and professional.
                </p>
            </div>
        </Card>
    );
}
