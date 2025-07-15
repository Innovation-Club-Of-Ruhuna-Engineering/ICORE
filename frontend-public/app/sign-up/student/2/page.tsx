import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import StudentRegStepTwo from '@/components/sign-up/student-registration-step-two'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header/>
        <StudentRegStepTwo/>
        <Footer/>
    </div>
  )
}

export default page
