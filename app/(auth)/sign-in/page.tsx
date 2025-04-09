import LoginForm from '@/components/signin/Login-form'
import React from 'react'

const SigninPage = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
       <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default SigninPage