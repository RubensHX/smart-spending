import { RegisterForm } from '@/components/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Spending | Register',
}

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
