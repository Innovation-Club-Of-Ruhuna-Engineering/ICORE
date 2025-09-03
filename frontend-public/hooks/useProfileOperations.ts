"use client";

import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { profileApi } from "@/lib/profile/profileMethods";

interface UseProfileOperationsProps {
    onProfileUpdate?: () => void;
    onProfileDelete?: () => void;
}

export function useProfileOperations({
    onProfileUpdate,
    onProfileDelete
}: UseProfileOperationsProps = {}) {
    const [loading, setLoading] = useState(false);

    const updateProfile = useCallback(async (data: any) => {
        try {
            setLoading(true);
            await profileApi.updateProfile(data);
            toast.success("Profile updated successfully!");
            onProfileUpdate?.();
            return true;
        } catch (error: any) {
            console.error("Error updating profile:", error);
            const message = error.response?.data?.message || "Failed to update profile";
            toast.error(message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [onProfileUpdate]);

    const updatePassword = useCallback(async (data: { currentPassword: string; newPassword: string }) => {
        try {
            setLoading(true);
            await profileApi.updatePassword(data);
            toast.success("Password updated successfully!");
            onProfileUpdate?.();
            return true;
        } catch (error: any) {
            console.error("Error updating password:", error);
            const message = error.response?.data?.message || "Failed to update password";
            toast.error(message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [onProfileUpdate]);

    const deleteProfile = useCallback(async () => {
        try {
            setLoading(true);
            await profileApi.deleteProfile();
            toast.success("Account deleted successfully!");
            onProfileDelete?.();
            return true;
        } catch (error: any) {
            console.error("Error deleting profile:", error);
            const message = error.response?.data?.message || "Failed to delete account";
            toast.error(message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [onProfileDelete]);

    return {
        loading,
        updateProfile,
        updatePassword,
        deleteProfile,
    };
}
