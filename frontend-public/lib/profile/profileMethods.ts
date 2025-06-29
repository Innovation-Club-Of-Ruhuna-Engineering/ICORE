import axiosInstance from "../axios/axiosInstance";

export interface UserProfileByUsernameResponse {
  id:string;
  firstName: string;
  lastName: string;
  department: string | null;
  contactNumber: string | null;
  email: string;
  batch: string | null;
  createdAt: string;
  role: string;
}

export const profileApi = {
  getProfileByUsername: async (username: string) => {
    const response = await axiosInstance.get<UserProfileByUsernameResponse>(`/user/profile/${username}`);
    return response.data;
  }
};

