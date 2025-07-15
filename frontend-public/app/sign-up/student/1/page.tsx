import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import StudentRegStepOne from '@/components/sign-up/student-registration-step-one'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <StudentRegStepOne/>
      <Footer/>
    </div>
  )
}

export default page
