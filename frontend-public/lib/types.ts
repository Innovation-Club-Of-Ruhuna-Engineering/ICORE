export interface Project {
  id: number;
  name: string;
  description: string;
  field: 'electrical' | 'marine' | 'mechanical' | 'civil'|'computer';
  tags: string[];
  author: string;
  authorAvatar?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  electrical: boolean;
  marine: boolean;
  mechanical: boolean;
  civil: boolean;
  computer: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}