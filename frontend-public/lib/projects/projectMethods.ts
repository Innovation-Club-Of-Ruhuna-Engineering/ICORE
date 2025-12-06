import { AxiosResponse } from 'axios';
import axiosInstance from "../axios/axiosInstance";

// Enums from Prisma schema
export type ProjectRole = 'LEADER' | 'MEMBER' | 'SUPERVISOR' | 'CONTRIBUTOR';
export type ProjectType = 'RESEARCH' | 'DESIGN' | 'DEVELOPMENT' | 'REXTRO_2025' | 'FYP' | 'OTHER';
export type Status = 'ACTIVE' | 'PENDING' | 'INACTIVE';

export interface ProjectMember {
  userId: string;
  role: ProjectRole;
}

export interface GuestMember {
  name: string;
  email: string;
  role: ProjectRole;
}

export interface PublicProjectOwner {
  id: string;
  username: string;
}

export interface PublicProject {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  startDate: Date;
  endDate?: Date;
  tags: string[];
  techDetails?: string;
  technologies: string[];
  references: string[];
  papers: string[];
  photos: string[];
  documents: string[];
  youtubeURL?: string;
  websiteURL?: string;
  githubURL?: string;
  isVisible: boolean;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  owner: PublicProjectOwner;
  membersCount: number;
  guestMembersCount: number;
}

export interface CreateProjectData {
  name: string;
  description: string;
  type: ProjectType;
  startDate: string;
  endDate?: string;
  tags?: string[];
  techDetails?: string;
  technologies?: string[];
  references?: string[];
  papers?: string[];
  photos?: string[];
  documents?: string[];
  youtubeURL?: string;
  websiteURL?: string;
  githubURL?: string;
  isVisible?: boolean;
  status?: Status;
  members?: ProjectMember[];
  guestMembers?: GuestMember[];
}

export type UpdateProjectData = Partial<CreateProjectData>;

export interface ProjectResponse extends PublicProject {
  guestMembers: GuestMember[];
  members: Array<{
    id: string;
    role: ProjectRole;
    user: {
      id: string;
      username: string;
      email: string;
      avatarUrl?: string;
    };
  }>;
}

export interface PublicProjectsResponse {
  projects: PublicProject[];
  total: number;
  hasMore: boolean;
}

export interface FilterOptions {
  types: string[];
  statuses: string[];
  tags: string[];
  technologies: string[];
}

export interface ProjectFilters {
  search?: string;
  type?: string;
  status?: string;
  tags?: string[];
  technologies?: string[];
  sortBy?: 'createdAt' | 'name' | 'startDate';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Example create project data:
 * {
 *   name: "AI Image Recognition System",
 *   description: "A deep learning based image recognition system",
 *   type: "DEVELOPMENT",
 *   startDate: "2025-09-15T00:00:00Z",
 *   tags: ["AI", "Machine Learning"],
 *   techDetails: "Built using TensorFlow 2.0",
 *   technologies: ["Python", "TensorFlow"],
 *   isVisible: true
 * }
 */

export const projectApi = {
  // Public Project APIs (no authentication required)
  getPublicProjects: async (
    page: number = 1,
    limit: number = 10,
    filters?: ProjectFilters
  ): Promise<AxiosResponse<PublicProjectsResponse>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.tags) filters.tags.forEach(tag => params.append('tags', tag));
      if (filters.technologies) filters.technologies.forEach(tech => params.append('technologies', tech));
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    }

    return await axiosInstance.get(`/project/public/all?${params}`);
  },

  getPublicFilterOptions: async (): Promise<AxiosResponse<FilterOptions>> => {
    return await axiosInstance.get('/project/public/filters');
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
    filters?: ProjectFilters
  ): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.tags) filters.tags.forEach(tag => params.append('tags', tag));
      if (filters.technologies) filters.technologies.forEach(tech => params.append('technologies', tech));
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    }

    return await axiosInstance.get(`/project?${params}`);
  },

  getUserProjects: async (userId: string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`/project/user-projects/${userId}`);
  },

  getProjectById: async (id: string): Promise<AxiosResponse> => {
    return await axiosInstance.get(`/project/public/${id}`);
  },

  getPrivateProjectById: async (id: string): Promise<AxiosResponse> => {
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
  },

  // Image upload
  uploadProjectImages: async (projectId: string, files: File[]): Promise<AxiosResponse> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return await axiosInstance.post(`/project/${projectId}/upload-images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
