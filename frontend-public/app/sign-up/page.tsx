import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import SignUp from '@/components/sign-up/auth-container'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <SignUp/>
      <Footer/>
    </div>
  )
}

export default page
