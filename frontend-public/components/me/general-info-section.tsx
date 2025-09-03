"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { User2, Mail, GraduationCap, Save, Loader2, IdCard, Phone, Users } from "lucide-react";
import { User } from "@/types/auth/userAuthTypes";
import { profileApi } from "@/lib/profile/profileMethods";
import Card from "@/components/me/card";

interface GeneralInfoSectionProps {
    user: User;
    onUpdate: () => void;
}

export function GeneralInfoSection({ user, onUpdate }: GeneralInfoSectionProps) {
    const [loading, setLoading] = useState(false);
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
        pitch: user.pitch || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                contactNumber: formData.contactNumber,
                gender: formData.gender,
                department: formData.department,
                batch: formData.batch,
                regNumber: formData.regNumber,
                pitch: formData.pitch,
            };

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
                    </div>

                    <div>
                        <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 mb-2">
                            About / Pitch
                        </label>
                        <textarea
                            id="pitch"
                            value={formData.pitch}
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
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Academic Information Section */}
            <Card className="flex flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                        <p className="text-gray-600 text-sm">Your educational details</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
