import { AxiosResponse } from 'axios';
import axiosInstance from "../axios/axiosInstance";

interface RegisterData {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'GENERAL' | 'FULL' | 'COMMITTEE' | 'ACADEMIC' | 'INDUSTRY';
  }

  interface LoginData {
    email: string;
    password: string;
  }

  interface RegisterResponse {
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
  
  interface User {
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

  export const authApi = {
    register: async (data: RegisterData): Promise<AxiosResponse<RegisterResponse>> => {
      return await axiosInstance.post<RegisterResponse>('/user', data);
    },
  
    login: async (data: LoginData): Promise<AxiosResponse> => {
      return await axiosInstance.post('/auth/login', data);
    },
  
    logout: async (): Promise<AxiosResponse> => {
      return await axiosInstance.post('/auth/logout');
    },
  
    updateProfile: async (data: Partial<RegisterData>): Promise<AxiosResponse> => {
      return await axiosInstance.patch('/user/profile', data);
    },

    getProfile: async (): Promise<AxiosResponse<User>> => {
        return await axiosInstance.get('/user/profile');
    },
  };