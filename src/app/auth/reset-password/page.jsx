'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: new URLSearchParams(window.location.search).get('token'),
          password: data.password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message)
        setTimeout(() => router.push('/auth/login'), 3000)
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError('Ha ocurrido un error, por favor inténtalo de nuevo.')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center" style={{backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover"}}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center mb-6">
          <Image
            src="/isotipodos.png"
            width={150}
            height={150}
            alt="Logo"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-custom-blue">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Nueva Contraseña:</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: 'La contraseña es requerida',
                minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
              })}
              className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full border border-gray-300"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: 'Por favor, confirme su contraseña',
                validate: (value) => value === watch('password') || 'Las contraseñas no coinciden'
              })}
              className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full border border-gray-300"
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>
          <button type="submit" className="w-full bg-custom-blue text-white hover:bg-custom-green hover:text-custom-blue p-3 rounded-lg mt-2">
            Restablecer Contraseña
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>
    </div>
  )
}