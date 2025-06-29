export type UserRole = 'GENERAL' | 'FULL' | 'COMMITTEE' | 'ACADEMIC' | 'INDUSTRY';
export type UserStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE';

export interface User {
    id?: string; // id may be missing in some API responses
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    contactNumber?: string | null;
    gender?: string | null;
    department?: string | null;
    batch?: string | null;
    regNumber?: string | null;
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