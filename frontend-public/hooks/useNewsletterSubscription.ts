"use client";
import { useState } from 'react';
import axiosInstance from '@/lib/axios/axiosInstance';
import toast from 'react-hot-toast';

interface SubscriptionData {
    name: string;
    email: string;
    contactNumber: string;
    age?: number;
    school?: string;
}

export const useNewsletterSubscription = () => {
    const [loading, setLoading] = useState(false);

    const subscribe = async (data: SubscriptionData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/newsletter/subscribe', data);
            toast.success('Successfully subscribed to the newsletter!');
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { subscribe, loading };
};