'use client'
import React from 'react'
import LeftSection from './left-section'
import RightSection from './right-section'

const AuthContainer = () => {

  return (
    <div className='min-h-screen flex items-center justify-center  bg-white px-4 py-8 sm:py-12 lg:px-2'>

      <LeftSection/>
      <RightSection/>

    </div>
  )
}

export default AuthContainer