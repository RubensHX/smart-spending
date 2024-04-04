import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Spending | Login',
}

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
