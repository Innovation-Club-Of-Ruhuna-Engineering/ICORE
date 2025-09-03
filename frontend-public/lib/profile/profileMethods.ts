import { AxiosResponse } from 'axios';
import axiosInstance from '../axios/axiosInstance';

interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    regNumber?: string;
    contactNumber?: string;
    gender?: string;
    department?: string;
    batch?: string;
    pitch?: string;
    bio?: string;
    title?: string;
    company?: string;
    location?: string;
    dateOfBirth?: string;
    institution?: string;
    fieldOfStudy?: string;
    graduationYear?: string;
    yearsOfExperience?: number;
    avatarUrl?: string;
    coverImageUrl?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    experiences?: any[];
    skills?: any[];
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileData {
    username?: string;
    firstName?: string;
    lastName?: string;
    regNumber?: string;
    contactNumber?: string;
    phone?: string; // Alternative phone field
    gender?: string;
    department?: string;
    batch?: string;
    pitch?: string;
    bio?: string; // Biography/description
    title?: string; // Professional title
    company?: string; // Current company
    location?: string; // Geographic location
    dateOfBirth?: string; // Date of birth
    institution?: string; // Educational institution
    fieldOfStudy?: string; // Field of study
    graduationYear?: string; // Graduation year
    yearsOfExperience?: number; // Years of professional experience
    avatarUrl?: string; // Profile picture URL
    coverImageUrl?: string; // Cover image URL
    website?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    experiences?: any[]; // JSON array of experiences
    skills?: any[]; // JSON array of skills
}

export interface UpdatePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const profileApi = {
    // Get current user profile
    getProfile: async (): Promise<AxiosResponse<User>> => {
        return await axiosInstance.get('/user/profile');
    },

    // Update current user profile
    updateProfile: async (data: UpdateProfileData): Promise<AxiosResponse<User>> => {
        return await axiosInstance.patch('/user/profile', data);
    },

    // Update password
    updatePassword: async (data: UpdatePasswordData): Promise<AxiosResponse<{ message: string }>> => {
        return await axiosInstance.patch('/user/profile/password', data);
    },

    // Delete current user profile
    deleteProfile: async (): Promise<AxiosResponse<{ message: string }>> => {
        return await axiosInstance.delete('/user/profile');
    }
};
