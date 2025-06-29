import { AxiosResponse } from 'axios';
import axiosInstance from "../axios/axiosInstance";
import { User, RegisterData } from '@/types/auth/userAuthTypes';

interface LoginData {
    email: string;
    password: string;
}

export const authApi = {
    register: async (data: RegisterData): Promise<AxiosResponse<User>> => {
        return await axiosInstance.post<User>('/user', data);
    },

    login: async (data: LoginData): Promise<AxiosResponse> => {
        return await axiosInstance.post('/auth/login', data);
    },

    logout: async (): Promise<AxiosResponse> => {
        return await axiosInstance.post('/auth/logout');
    },

    updateProfile: async (data: Partial<RegisterData>): Promise<AxiosResponse<User>> => {
        return await axiosInstance.patch('/user/profile', data);
    },

    getProfile: async (): Promise<AxiosResponse<User>> => {
        return await axiosInstance.get('/user/profile');
    },
};