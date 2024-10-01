'use client'

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);    
    
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(response)

    if (response.error) {
      setError(response.error)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <div className="bg-custom-blue text-white text-center py-16">
      </div>
      <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center" style={{paddingTop:"7rem", backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
        <form onSubmit={onSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          {error && (
            <p className="bg-red-500 text-white text-lg p-3 rounded mb-4">{error}</p>
          )}
          <div className="flex justify-center items-center mb-6">
            <Image
              src="/isotipodos.png"
              width={150}
              height={150}
              alt="Logo"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: 'Correo electrónico requerido'
                }
              })}
              className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full border border-gray-300"
              placeholder="correo@ejemplo.cl"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Contraseña:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Contraseña requerida."
                  }
                })}
                className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full border border-gray-300"
                placeholder="**********"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <button className="w-full bg-custom-blue text-white hover:bg-custom-green hover:text-custom-blue p-3 rounded-lg mt-2 mb-4">
            INICIAR SESIÓN
          </button>
          <div className="text-center">
            <Link href="/auth/forgot-password" className="text-custom-blue hover:underline text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;