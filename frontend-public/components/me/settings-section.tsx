"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Lock, Trash2, Save, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/userAuthContext";
import { profileApi } from "@/lib/profile/profileMethods";
import Card from "@/components/me/card";
import { User } from "@/types/auth/userAuthTypes";

interface SettingsSectionProps {
    user: User;
    onUpdate: () => void;
}

export function SettingsSection({ onUpdate }: SettingsSectionProps) {
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { logout } = useAuth();

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPasswordData(prev => ({ ...prev, [id]: value }));
    };

    const handlePasswordUpdate = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords don't match!");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long!");
            return;
        }

        try {
            setPasswordLoading(true);
            await profileApi.updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success("Password updated successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            onUpdate();
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password. Please check your current password.");
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setDeleteLoading(true);
            await profileApi.deleteProfile();
            toast.success("Account deleted successfully!");
            await logout();
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again.");
        } finally {
            setDeleteLoading(false);
            setShowDeleteConfirmation(false);
        }
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const getStrengthColor = (strength: number) => {
        if (strength < 2) return "bg-red-500";
        if (strength < 4) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = (strength: number) => {
        if (strength < 2) return "Weak";
        if (strength < 4) return "Medium";
        return "Strong";
    };

    const passwordStrength = getPasswordStrength(passwordData.newPassword);

    return (
        <div className="space-y-6">
            {/* Password Security Section */}
            <Card className="flex flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Lock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Password & Security</h3>
                        <p className="text-gray-600 text-sm">Keep your account secure with a strong password</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter your current password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div></div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter your new password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {passwordData.newPassword && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${passwordStrength < 2 ? 'text-red-600' :
                                            passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'
                                            }`}>
                                            {getStrengthText(passwordStrength)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Password should contain uppercase, lowercase, numbers, and special characters
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm your new password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">Passwords don&apos;t match</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handlePasswordUpdate}
                            disabled={passwordLoading || !passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            {passwordLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {passwordLoading ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </div>
            </Card>

            {/* Account Management Section */}
            <Card className="border-red-200">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-red-800">Danger Zone</h3>
                        <p className="text-red-600 text-sm">Irreversible and destructive actions</p>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-red-800 mb-2">Delete Account</h4>
                            <p className="text-red-700 mb-4">
                                Once you delete your account, there is no going back. This action cannot be undone.
                                All your data, projects, and profile information will be permanently removed from our servers.
                            </p>

                            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                                <div className="flex items-start">
                                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                                    <div>
                                        <h5 className="font-medium text-red-800">What will be deleted:</h5>
                                        <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
                                            <li>Your profile and personal information</li>
                                            <li>All projects and associated data</li>
                                            <li>Account history and activity logs</li>
                                            <li>Social media connections</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!showDeleteConfirmation ? (
                        <button
                            onClick={() => setShowDeleteConfirmation(true)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete My Account
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-white border-2 border-red-300 rounded-lg">
                                    <p className="font-semibold text-red-800 mb-2">⚠️ Are you absolutely sure&quot;</p>
                                <p className="text-red-700 text-sm mb-3">
                                        This action cannot be undone. Type <strong>&quot;DELETE&quot;</strong> to confirm:
                                </p>
                                <input
                                    type="text"
                                    placeholder="Type DELETE to confirm"
                                    className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteLoading}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    {deleteLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                    {deleteLoading ? "Deleting..." : "Yes, Delete Forever"}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirmation(false)}
                                    disabled={deleteLoading}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
