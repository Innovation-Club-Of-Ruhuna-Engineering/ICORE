import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import AuthContainer from '@/components/sign-up/auth-container'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <AuthContainer/>
      <Footer/>
    </div>
  )
}

export default page
