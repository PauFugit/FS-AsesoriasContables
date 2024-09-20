'use client'

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import {useState} from 'react'


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const router = useRouter()
  const [error, setError] = useState(null)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);    
    
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect:false,
    });
    console.log(response)

    if(response.error){
      setError(response.error)
    }else{
      router.push('/dashboard')
      router.refresh()
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">

      <form onSubmit={onSubmit} className="w-1/4">

      {error && (
        <p className="bg-red-500 text-lg p-3 rounded">{error}</p>
      )}

        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Login
        </h1>
        <label htmlFor="email" className="text-slate-500 mb-2 block  text-sm" >Correo electrónico:</label>
        <input type="email"
          {...(register("email", {
            required: {
              value: true,
              message: 'Correo electrónico requerido'
            }
          }))}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="correo@ejemplo.cl"
        />
        {
          errors.email && (
            <span
              className="text-red-500 text-sm">{errors.email.message}</span>
          )
        }
        <label htmlFor="password" className="text-slate-500 mb-2 block  text-sm" >Contraseña:</label>
        <input type="password"
          {...(register("password", {
            required: {
              value: true,
              message: "Contraseña requerida."
            }
          }))}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="**********"

        />
        {
          errors.password && (
            <span
              className="text-red-500 text-sm">{errors.password.message}</span>
          )
        }
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Ingresar
        </button>
      </form>

    </div>
  )
}

export default LoginPage;