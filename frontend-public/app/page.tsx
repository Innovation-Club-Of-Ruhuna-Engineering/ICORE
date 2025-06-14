"use client";

import { useAuth } from '@/contexts/userAuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Home = () => {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-up');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null; // Return null while redirecting

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h2 className='text-2xl font-medium mb-4'>Welcome to </h2>
      <h1 className='text-6xl text-blue-600 mb-2 font-extrabold'>The Innovation Club Of Ruhuna Engineering</h1>
      <h1 className='text-6xl text-midnight mb-2 font-extrabold'>The ICORE</h1>
      <div>
        <h1>Welcome {user.firstName} {user.lastName}</h1>
        <p>Role: {user.role}</p>
        <p>Status: {user.status}</p>
        {user.regNumber && <p>Registration Number: {user.regNumber}</p>}
      </div>
    </div>
  );
}

export default Home; // Changed component name to follow React conventions
