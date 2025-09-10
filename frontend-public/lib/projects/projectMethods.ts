import { AxiosResponse } from 'axios';
import axiosInstance from "../axios/axiosInstance";

export interface ProjectMember {
  userId: string;
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR';
}

export interface GuestMember {
  name: string;
  email: string;
  role: 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR';
}

export interface PublicProjectOwner {
  id: string;
  username: string;
}

export interface PublicProject {
  id: string;
  name: string;
  about: string;
  description: string;
  type: string;
  startDate: Date;
  endDate?: Date;
  tags: string[];
  details?: string;
  technologies: string[];
  photos: string[];
  youtubeURL?: string;
  websiteURL?: string;
  isVisible: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  owner: PublicProjectOwner;
  membersCount: number;
  guestMembersCount: number;
}

export interface CreateProjectData {
  name: string;
  about: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
  tags: string[];
  details?: string;
  technologies: string[];
  references?: string[];
  papers?: string[];
  photos?: string[];
  documents?: string[];
  youtubeURL?: string;
  websiteURL?: string;
  githubURL?: string;
  isVisible?: boolean;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  members?: ProjectMember[];
  guestMembers?: GuestMember[];
}

export type UpdateProjectData = Partial<CreateProjectData>;

export interface PublicProjectsResponse {
  projects: PublicProject[];
  total: number;
  hasMore: boolean;
}

export const projectApi = {
  // Public Project APIs (no authentication required)
  getPublicProjects: async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    type?: string,
    tags?: string[]
  ): Promise<AxiosResponse<PublicProjectsResponse>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (tags) tags.forEach(tag => params.append('tags', tag));
    return await axiosInstance.get(`/project/public/all?${params}`);
  },

  getPublicProjectsByUsername: async (username: string): Promise<AxiosResponse<PublicProject[]>> => {
    return await axiosInstance.get(`/project/public/user/${username}`);
  },

  // Project CRUD operations (authentication required)
  createProject: async (data: CreateProjectData): Promise<AxiosResponse> => {
    return await axiosInstance.post('/project', data);
  },

  getProjects: async (
    page: number = 1, 
    limit: number = 10,
    search?: string,
    type?: string,
    tags?: string[]
  ): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (tags) tags.forEach(tag => params.append('tags', tag));
    return await axiosInstance.get(`/project?${params}`);
  },

  getUserProjects: async (userId: string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`/project/user-projects/${userId}`);
  },

  getProjectById: async (id: string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`/project/${id}`);
  },

  updateProject: async (id: string, data: UpdateProjectData): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`/project/${id}`, data);
  },

  deleteProject: async (id: string): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`/project/${id}`);
  },

  // Member management
  addMember: async (projectId: string, data: ProjectMember): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/project/${projectId}/member`, data);
  },

  addGuestMember: async (projectId: string, data: GuestMember): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/project/${projectId}/guest-member`, data);
  },

  updateMemberRole: async (
    projectId: string, 
    memberId: string, 
    role: ProjectMember['role']
  ): Promise<AxiosResponse> => {
    return await axiosInstance.patch(`/project/${projectId}/member/${memberId}`, { role });
  },

  removeMember: async (projectId: string, memberId: string): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`/project/${projectId}/member/${memberId}`);
  },

  removeGuestMember: async (projectId: string, guestMemberId: string): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`/project/${projectId}/guest-member/${guestMemberId}`);
  },

  getProjectMembers: async (projectId: string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`/project/${projectId}/members`);
  },

  getProjectGuestMembers: async (projectId: string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`/project/${projectId}/guest-members`);
  }
};
