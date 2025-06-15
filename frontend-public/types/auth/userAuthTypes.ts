export type UserRole = 'GENERAL' | 'FULL' | 'COMMITTEE' | 'ACADEMIC' | 'INDUSTRY';
export type UserStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE';

export interface APIUser {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    regNumber: string | null;
    role: string;  // Keep this as string for API response
    status: string;  // Keep this as string for API response
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    regNumber: string | null;
    role: UserRole;
    status: UserStatus;
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