import { AxiosResponse } from 'axios';
import axiosInstance from "../axios/axiosInstance";

interface UpdateRegisterData {
    regNumber?: string;
    contactNumber?: string;
    gender?: string;
    department?: string; // Changed to lowercase to match convention
    batch?: string;
}

interface UpdateRegisterResponse {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    regNumber: string | null;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const studentRegApi = {
    updateProfile: async (userId: string, data: Partial<UpdateRegisterData>): Promise<AxiosResponse<UpdateRegisterResponse>> => {
        return await axiosInstance.patch(`/user/${userId}`, data);
    },
};