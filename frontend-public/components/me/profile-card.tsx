"use clt";

import { User } from "@/types/auth/userAuthTypes";
import { Camera, MapPin, Calendar, Globe, Mail, Phone, GraduationCap, Briefcase, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { profileApi } from "@/lib/profile/profileMethods";
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface ProfileCardProps {
    user: User;
    onUpdate: () => void;
}

export default function ProfileCard({ user, onUpdate }: ProfileCardProps) {
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error('Image size should be less than 5MB');
            return;
        }

        try {
            setIsUploadingAvatar(true);
            const formData = new FormData();
            formData.append('avatar', file);

            // Assuming you have an upload endpoint
            const response = await fetch('/api/upload/avatar', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            await profileApi.updateProfile({ avatarUrl: data.url });
            toast.success('Profile picture updated successfully!');
            onUpdate();
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast.error('Failed to upload profile picture');
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit for cover
            toast.error('Image size should be less than 10MB');
            return;
        }

        try {
            setIsUploadingCover(true);
            const formData = new FormData();
            formData.append('cover', file);

            const response = await fetch('/api/upload/cover', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            await profileApi.updateProfile({ coverImageUrl: data.url });
            toast.success('Cover image updated successfully!');
            onUpdate();
        } catch (error) {
            console.error('Error uploading cover:', error);
            toast.error('Failed to upload cover image');
        } finally {
            setIsUploadingCover(false);
        }
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Not specified';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Invalid date';
        }
    };

    const getInitials = (firstName?: string, lastName?: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Cover Image Section */}
            <div className="relative h-48 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-800">
                {user.coverImageUrl && (
                    <img
                        src={user.coverImageUrl}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                )}

                {/* Cover Image Upload */}
                <div className="absolute top-4 right-4">
                    <label htmlFor="cover-upload" className="cursor-pointer">
                        <div className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg transition-all">
                            <Camera className="h-5 w-5 text-white" />
                        </div>
                    </label>
                    <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                        disabled={isUploadingCover}
                    />
                </div>

                {/* Upload Progress Overlay for Cover */}
                {isUploadingCover && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                            <p className="text-sm">Uploading cover image...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Content */}
            <div className="px-6 pb-6">
                {/* Centered Avatar and Basic Info */}
                <div className="flex flex-col items-center text-center -mt-16 relative z-10">
                    {/* Avatar */}
                    <div className="relative mb-4">
                        <div className="relative">
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">
                                        {getInitials(user.firstName, user.lastName)}
                                    </span>
                                </div>
                            )}

                            {/* Avatar Upload Button */}
                            <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 cursor-pointer">
                                <div className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-colors">
                                    <Camera className="h-4 w-4 text-white" />
                                </div>
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                                disabled={isUploadingAvatar}
                            />

                            {/* Upload Progress for Avatar */}
                            {isUploadingAvatar && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name and Title */}
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-lg text-gray-600 mb-1">@{user.username}</p>
                        {user.title && (
                            <p className="text-xl text-blue-600 mb-2">{user.title}</p>
                        )}
                        {user.bio && (
                            <p className="text-gray-700 mb-3 leading-relaxed max-w-2xl">{user.bio}</p>
                        )}
                    </div>

                    {/* Key Info Row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Joined {formatDate(user.createdAt)}</span>
                        </div>
                        {user.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.company && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                <span>{user.company}</span>
                            </div>
                        )}
                        {user.institution && (
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-gray-400" />
                                <span>{user.institution}</span>
                            </div>
                        )}
                    </div>

                    {/* Role Badge */}
                    <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {user.role === 'GENERAL' ? 'General Member' :
                                user.role === 'FULL' ? 'Full Member' :
                                    user.role === 'COMMITTEE' ? 'Committee Member' :
                                        user.role === 'ACADEMIC' ? 'Academic' :
                                            user.role === 'INDUSTRY' ? 'Industry Professional' :
                                                'Member'}
                        </span>
                    </div>
                </div>

                {/* Social Media Links */}
                {(user.linkedin || user.github || user.twitter || user.instagram || user.youtube || user.website) && (
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-center flex-wrap gap-3">
                            {user.linkedin && (
                                <a
                                    href={user.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 rounded-full transition-colors"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin className="h-4 w-4" />
                                </a>
                            )}
                            {user.github && (
                                <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900 rounded-full transition-colors"
                                    title="GitHub"
                                >
                                    <FaGithub className="h-4 w-4" />
                                </a>
                            )}
                            {user.twitter && (
                                <a
                                    href={user.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-gray-800 hover:text-gray-950 rounded-full transition-colors"
                                    title="Twitter/X"
                                >
                                    <FaXTwitter className="h-4 w-4" />
                                </a>
                            )}
                            {user.instagram && (
                                <a
                                    href={user.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-600 hover:text-purple-800 rounded-full transition-colors"
                                    title="Instagram"
                                >
                                    <FaInstagram className="h-4 w-4" />
                                </a>
                            )}
                            {user.youtube && (
                                <a
                                    href={user.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-gray-200 hover:text-white rounded-full transition-colors"
                                    title="YouTube"
                                >
                                    <FaYoutube className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}