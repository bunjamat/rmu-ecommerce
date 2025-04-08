import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage