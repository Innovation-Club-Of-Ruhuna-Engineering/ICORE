"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth/authMethods';
import { AuthContextType, RegisterData, User, UserRole, UserStatus } from '@/types/auth/userAuthTypes';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const validateAndTransformUser = (apiUser: User): User | null => {
        if (!['GENERAL', 'FULL', 'COMMITTEE', 'ACADEMIC', 'INDUSTRY'].includes(apiUser.role)) {
            console.error('Invalid role received from API:', apiUser.role);
            return null;
        }
        if (!['ACTIVE', 'PENDING', 'INACTIVE'].includes(apiUser.status)) {
            console.error('Invalid status received from API:', apiUser.status);
            return null;
        }
        return {
            ...apiUser,
            role: apiUser.role as UserRole,
            status: apiUser.status as UserStatus
        };
    };

    const fetchUserProfile = async () => {
        try {
            const response = await authApi.getProfile();
            const transformedUser = validateAndTransformUser(response.data);
            if (transformedUser) {
                setUser(transformedUser);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setError('Invalid user data received');
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const register = async (data: RegisterData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authApi.register(data);
            await authApi.login({
                email: data.email,
                password: data.password
            });
            await fetchUserProfile();
            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.message || 'Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            await authApi.login({ email, password });
            await fetchUserProfile();
            setIsAuthenticated(true);
            router.push('/me');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed');
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authApi.logout();
            setIsAuthenticated(false);
            setUser(null);
            router.push('/signin');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            error,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);