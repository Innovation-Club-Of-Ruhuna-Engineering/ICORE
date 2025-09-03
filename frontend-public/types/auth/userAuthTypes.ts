export type UserRole = 'GENERAL' | 'FULL' | 'COMMITTEE' | 'ACADEMIC' | 'INDUSTRY';
export type UserStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE';

export interface User {
    id?: string; // id may be missing in some API responses
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    contactNumber?: string | null;
    phone?: string | null; // Alternative phone field
    gender?: string | null;
    department?: string | null;
    batch?: string | null;
    regNumber?: string | null;
    pitch?: string | null;
    bio?: string | null; // Biography/description
    title?: string | null; // Professional title
    company?: string | null; // Current company
    location?: string | null; // Geographic location
    dateOfBirth?: string | null; // Date of birth
    institution?: string | null; // Educational institution
    fieldOfStudy?: string | null; // Field of study
    graduationYear?: string | null; // Graduation year
    yearsOfExperience?: number | null; // Years of professional experience
    avatarUrl?: string | null; // Profile picture URL
    coverImageUrl?: string | null; // Cover image URL
    website?: string | null;
    github?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    experiences?: any[] | null; // JSON array of experiences
    skills?: any[] | null; // JSON array of skills
    role: UserRole | string;
    status: UserStatus | string;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: User | null;
    register: (data: RegisterData) => Promise<any>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}