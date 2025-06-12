import { LoginForm } from '@/components/login-form'
import React from 'react'

const Auth = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default Auth