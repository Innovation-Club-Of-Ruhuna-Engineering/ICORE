import React from 'react'
import { Input } from '../ui/input'

const Registration = () => {
    return (
    
        <form className="w-full max-w-md py-6 bg-white">

            <div className="mb-4">
                <div className='flex'>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-icoreDarkBlue">Email</label>
                    <p className='text-red-400'>*</p>
                </div>
                <Input id="name" type="email" placeholder="Enter your email address" className="w-full border-2 border-icoreBlue/40" />
            </div>

            <div className="mb-4">
                <div className='flex'>
                    <label htmlFor="username" className="block text-sm font-medium mb-2 text-icoreDarkBlue">Username</label>
                    <p className='text-red-400'>*</p>
                </div>
                <Input id="username" type="text" placeholder="Enter your username" className="w-full border-2 border-icoreBlue/40" />
            </div>

            <div className="mb-4">
                <div className='flex'>
                    <label htmlFor="firstname" className="block text-sm font-medium mb-2 text-icoreDarkBlue">First Name</label>
                    <p className='text-red-400'>*</p>
                </div>
                <Input id="firstname" type="text" placeholder="Enter your first name" className="w-full border-2 border-icoreBlue/40" />
            </div>

            <div className="mb-4">
                <div className='flex'>
                    <label htmlFor="lastname" className="block text-sm font-medium mb-2 text-icoreDarkBlue">Last Name</label>
                    <p className='text-red-400'>*</p>
                </div>
                <Input id="lastname" type="text" placeholder="Enter your last name" className="w-full border-2 border-icoreBlue/40" />
            </div>

            <div className="mb-4">
                <div className='flex'>
                    <label htmlFor="membertype" className="block text-sm font-medium mb-2 text-icoreDarkBlue">Member Type</label>
                    <p className='text-red-400'>*</p>
                </div>
                <select
                    id="membertype"
                    className="w-full border-2 border-icoreBlue/40 rounded-md py-2 px-3 text-icoreGray focus:outline-none focus:ring-2 focus:ring-icoreBlue/40 focus:border-transparent"
                >
                    <option value="" disabled selected>Select your member type</option>
                    <option value="student">Student</option>
                    <option value="academic_staff">Academic Staff</option>
                </select>
            </div>

            <div className="mb-4">
                <div className='flex'>
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-icoreDarkBlue">Password</label>
                    <p className='text-red-400'>*</p>
                </div>
                <Input id="password" type="password" placeholder="Create a password" className="w-full border-2 border-icoreBlue/40" />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[8px]">
                Create Account
            </button>
            
        </form>
        
        
      )
  
}

export default Registration

