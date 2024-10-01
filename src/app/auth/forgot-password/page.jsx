'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [message, setMessage] = useState('')

  const onSubmit = async (data) => {
    // Here you would typically send a request to your API to initiate the password reset process
    console.log('Password reset requested for:', data.email)
    setMessage('Si la cuenta existe para este correo, recibirás las instrucciones para reestablecer tu contraseña.')
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
        <h2 className="text-2xl font-bold mb-4 text-center text-custom-blue">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: 'Correo electrónico requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Dirección de correo inválida"
                }
              })}
              className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full border border-gray-300"
              placeholder="correo@ejemplo.cl"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <button type="submit" className="w-full bg-custom-blue text-white hover:bg-custom-green hover:text-custom-blue p-3 rounded-lg mt-2">
            Recuperar contraseña
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  )
}