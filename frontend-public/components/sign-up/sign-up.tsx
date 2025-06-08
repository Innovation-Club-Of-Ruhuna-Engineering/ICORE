import React from 'react'
import LeftImage from './left-image'
import StepOneForm from './step-one-form'


const SignUp = () => {
  return (
    <div className='flex min-h-screen w-full flex-col md:flex-row'>
      <div className='w-1/2 py-7 h-screen '>
        <LeftImage />

      </div>
      <div className='w-1/2 '><StepOneForm /></div>

    </div>
  )
}

export default SignUp
