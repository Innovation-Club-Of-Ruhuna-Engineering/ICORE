import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import StudentRegStepThree from '@/components/sign-up/student-registration-step-three'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header/>
        <StudentRegStepThree/>
        <Footer/>
    </div>
  )
}

export default page
