"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { User2, GraduationCap, Save, Loader2, Phone } from "lucide-react";
import { User } from "@/types/auth/userAuthTypes";
import { profileApi, UpdateProfileData } from "@/lib/profile/profileMethods";
import Card from "@/components/me/card";

interface GeneralInfoSectionProps {
    user: User;
    onUpdate: () => void;
}

export function GeneralInfoSection({ user, onUpdate }: GeneralInfoSectionProps) {
    const [loading, setLoading] = useState(false);

    // Check if user is a student (GENERAL, FULL, COMMITTEE) or professional (ACADEMIC, INDUSTRY)
    const isStudent = ['GENERAL', 'FULL', 'COMMITTEE'].includes(user.role);
    const isProfessional = ['ACADEMIC', 'INDUSTRY'].includes(user.role);

    const [formData, setFormData] = useState({
        // Core fields from sign-up form
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "", // Read-only
        // Additional profile fields
        contactNumber: user.contactNumber || "",
        gender: user.gender || "",
        department: user.department || "",
        batch: user.batch || "",
        regNumber: user.regNumber || "",
        bio: user.bio || "",
        location: user.location || "",
        company: user.company || "",
        institution: user.institution || "",
        // New fields from database
        title: user.title || "",
        fieldOfStudy: user.fieldOfStudy || "",
        graduationYear: user.graduationYear || "",
        yearsOfExperience: user.yearsOfExperience?.toString() || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            // Base update data that applies to all users
            const updateData: UpdateProfileData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                contactNumber: formData.contactNumber || undefined,
                gender: formData.gender || undefined,
                bio: formData.bio || undefined,
                location: formData.location || undefined,
                institution: formData.institution || undefined,
                fieldOfStudy: formData.fieldOfStudy || undefined,
                graduationYear: formData.graduationYear || undefined,

            };

            // Add student-specific fields
            if (isStudent) {
                updateData.department = formData.department || undefined;
                updateData.batch = formData.batch || undefined;
                updateData.regNumber = formData.regNumber || undefined;
            }

            // Add professional-specific fields
            if (isProfessional) {
                updateData.title = formData.title || undefined;
                updateData.company = formData.company || undefined;
                updateData.yearsOfExperience = formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : undefined;
            }

            console.log('Sending update data:', updateData);
            await profileApi.updateProfile(updateData);
            toast.success("Profile updated successfully!");
            onUpdate();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Basic Information Section */}
            <Card className="flex flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <User2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                        <p className="text-gray-600 text-sm">Core profile information from your account</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username *
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Enter your username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {isProfessional && (
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Professional Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder={user.role === 'ACADEMIC' ? "e.g., Professor, Lecturer" : "e.g., Software Engineer, Manager"}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        )}
                        {isProfessional && (
                            <div>
                                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience
                                </label>
                                <input
                                    type="number"
                                    id="yearsOfExperience"
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                    placeholder="Enter years of experience"
                                    min="0"
                                    max="50"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        )}

                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                            About / Bio
                        </label>
                        <textarea
                            id="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>
            </Card>

            {/* Contact Information Section */}
            <Card className="flex flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                        <p className="text-gray-600 text-sm">How can people reach you?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            id="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                            placeholder="Email cannot be changed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed after account creation</p>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., New York, NY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    {isProfessional && (
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                Company/Organization
                            </label>
                            <input
                                type="text"
                                id="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder={user.role === 'ACADEMIC' ? "e.g., University of Colombo" : "e.g., Google, Microsoft"}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                            {isStudent ? "Institution" : "Educational Background"}
                        </label>
                        <input
                            type="text"
                            id="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            placeholder={isStudent ? "e.g., University of Colombo" : "e.g., University of Colombo (Alma Mater)"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                </div>
            </Card>

            {/* Academic/Professional Information Section */}
            <Card className="flex flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {isStudent ? "Academic Information" : "Educational & Professional Details"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {isStudent ? "Your educational details" : "Your educational background and professional details"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isStudent && (
                        <>
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Computer Science and Engineering"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-2">
                                    Batch
                                </label>
                                <input
                                    type="text"
                                    id="batch"
                                    value={formData.batch}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2023, 20th Batch"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    id="regNumber"
                                    value={formData.regNumber}
                                    onChange={handleInputChange}
                                    placeholder="e.g., ENG/2023/001"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </>
                    )}

                    {/* Common fields for both students and professionals */}
                    <div>
                        <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                            Field of Study
                        </label>
                        <input
                            type="text"
                            id="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={handleInputChange}
                            placeholder="e.g., Computer Science, Electrical Engineering"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                            {isStudent ? "Expected Graduation Year" : "Graduation Year"}
                        </label>
                        <input
                            type="text"
                            id="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleInputChange}
                            placeholder="e.g., 2025"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
