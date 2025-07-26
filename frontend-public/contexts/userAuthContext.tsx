"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth/authMethods';
import { AuthContextType, RegisterData, User, APIUser, UserRole, UserStatus } from '@/types/auth/userAuthTypes';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const validateAndTransformUser = (apiUser: APIUser): User | null => {
        // Validate role
        if (!['GENERAL', 'FULL', 'COMMITTEE', 'ACADEMIC', 'INDUSTRY'].includes(apiUser.role)) {
            console.error('Invalid role received from API:', apiUser.role);
            return null;
        }

        // Validate status
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

    // Function to fetch user profile
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

    // Check auth status when component mounts
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const register = async (data: RegisterData) => {
        try {
            setLoading(true);
            setError(null);
            
            // First register the user
            const response = await authApi.register(data);
            
            // Then automatically log them in
            await authApi.login({ 
                email: data.email, 
                password: data.password 
            });
            
            // Fetch user profile to update context
            await fetchUserProfile();
            
            // Return the registration response data
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
            
            // After successful login, fetch the user profile
            await fetchUserProfile();
            router.push('/');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed');
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
            router.push('/sign-in');
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