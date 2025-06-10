
import { Project, ProjectsResponse, ApiResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const projectsApi = {
  getProjects: async (params?: {
    search?: string;
    fields?: string[];
    page?: number;
    limit?: number;
  }): Promise<ProjectsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params?.search) searchParams.append('search', params.search);
    if (params?.fields?.length) searchParams.append('fields', params.fields.join(','));
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/projects?${searchParams}`);
    
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch projects: ${response.statusText}`);
    }
    
    const result: ApiResponse<ProjectsResponse> = await response.json();
    return result.data;
  },

  getProject: async (id: number): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch project: ${response.statusText}`);
    }
    
    const result: ApiResponse<Project> = await response.json();
    return result.data;
  },

  // Create new project
  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to create project: ${response.statusText}`);
    }
    
    const result: ApiResponse<Project> = await response.json();
    return result.data;
  },
};