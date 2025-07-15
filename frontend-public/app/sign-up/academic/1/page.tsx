import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import AcademicStaffRegStepOne from '@/components/sign-up/academic-staff-registration-step-one'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <AcademicStaffRegStepOne/>
      <Footer/>
    </div>
  )
}

export default page
