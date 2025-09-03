"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/userAuthContext";
import { profileApi } from "@/lib/profile/profileMethods";
import Card from "@/components/me/card";
import { InputWithLabal } from "@/components/me/input";
import { SelectWithLabel } from "@/components/me/select";
import { User } from "@/types/auth/userAuthTypes";
import { Loader2, Save, Trash2 } from "lucide-react";

interface ProfileSectionProps {
    user: User;
    onUpdate: () => void;
}

export function GeneralInformationSection({ user, onUpdate }: ProfileSectionProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        regNumber: user?.regNumber || "",
        contactNumber: user?.contactNumber || "",
        gender: user?.gender || "",
        department: user?.department || "",
        batch: user?.batch || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await profileApi.updateProfile(formData);
            toast.success("Profile updated successfully!");
            onUpdate();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex flex-1">
            <div className="flex justify-between items-center mb-6">
                <Card.Header>General Information</Card.Header>
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

            <div className="grid grid-cols-2 not-md:grid-cols-1 not-lg:grid-cols-1 gap-x-12 gap-y-6">
                <InputWithLabal
                    label="First Name"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <InputWithLabal
                    label="Last Name"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <InputWithLabal
                    label="Username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <InputWithLabal
                    label="Registration Number"
                    id="regNumber"
                    placeholder="EG/20XX/XXXX"
                    value={formData.regNumber}
                    onChange={handleInputChange}
                />
                <InputWithLabal
                    label="Phone Number"
                    id="contactNumber"
                    placeholder="+947XXXXXXXX"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                />
                <SelectWithLabel
                    id="gender"
                    label="Gender"
                    placeholder="Select Gender"
                    items={[
                        ["male", "Male"],
                        ["female", "Female"],
                        ["other", "Other"],
                    ]}
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                />
                <SelectWithLabel
                    id="department"
                    label="Department"
                    placeholder="Select Department"
                    items={[
                        ["DEIE", "DEIE - Electrical & Information Engineering"],
                        ["DCEE", "DCEE - Civil & Environmental Engineering"],
                        ["DMME", "DMME - Mechanical & Manufacturing Engineering"],
                    ]}
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                />
                <SelectWithLabel
                    id="batch"
                    label="Batch"
                    placeholder="Select Batch"
                    items={[
                        ["20", "20th Batch"],
                        ["21", "21st Batch"],
                        ["22", "22nd Batch"],
                        ["23", "23rd Batch"],
                    ]}
                    value={formData.batch}
                    onValueChange={(value) => handleSelectChange("batch", value)}
                />
            </div>
        </Card>
    );
}

export function BiographySection({ user, onUpdate }: ProfileSectionProps) {
    const [loading, setLoading] = useState(false);
    const [pitch, setPitch] = useState(user?.pitch || "");

    const handleSave = async () => {
        try {
            setLoading(true);
            await profileApi.updateProfile({ pitch });
            toast.success("Biography updated successfully!");
            onUpdate();
        } catch (error) {
            console.error("Error updating biography:", error);
            toast.error("Failed to update biography. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex flex-1">
            <div className="flex justify-between items-center mb-6">
                <Card.Header>Biography</Card.Header>
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

            <div className="space-y-4">
                <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">
                    Tell us about yourself, your interests, and your innovative ideas
                </label>
                <textarea
                    id="pitch"
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Share your story, experiences, goals, and innovative ideas that drive you..."
                />
                <p className="text-sm text-gray-500">
                    {pitch.length} characters • Let your personality shine through!
                </p>
            </div>
        </Card>
    );
}

export function PasswordSection({ user, onUpdate }: ProfileSectionProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords don't match!");
            return;
        }

        if (formData.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long!");
            return;
        }

        try {
            setLoading(true);
            await profileApi.updatePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });
            toast.success("Password updated successfully!");
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            onUpdate();
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password. Please check your current password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex flex-1">
            <div className="flex justify-between items-center mb-6">
                <Card.Header>Change Password</Card.Header>
                <button
                    onClick={handleSave}
                    disabled={loading || !formData.currentPassword || !formData.newPassword}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>

            <div className="space-y-6 max-w-md">
                <InputWithLabal
                    label="Current Password"
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your current password"
                />
                <InputWithLabal
                    label="New Password"
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                />
                <InputWithLabal
                    label="Confirm New Password"
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                />
            </div>
        </Card>
    );
}

export function DangerZoneSection({ user, onUpdate }: ProfileSectionProps) {
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { logout } = useAuth();

    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            await profileApi.deleteProfile();
            toast.success("Account deleted successfully!");
            await logout();
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again.");
        } finally {
            setLoading(false);
            setShowConfirmation(false);
        }
    };

    return (
        <Card className="flex flex-1 border-red-200">
            <Card.Header className="text-red-600">Danger Zone</Card.Header>

            <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Delete Account</h3>
                    <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. This action cannot be undone.
                        All your data, projects, and profile information will be permanently removed.
                    </p>

                    {!showConfirmation ? (
                        <button
                            onClick={() => setShowConfirmation(true)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete My Account
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <p className="font-semibold text-red-800">Are you absolutely sure?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                    {loading ? "Deleting..." : "Yes, Delete Forever"}
                                </button>
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    disabled={loading}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
