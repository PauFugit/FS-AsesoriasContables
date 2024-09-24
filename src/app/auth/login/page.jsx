'use client'

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import {useState} from 'react'
import Image from 'next/image';


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
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center" style={{paddingTop:"7rem", backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>

      <form onSubmit={onSubmit} className="w-1/2">

      {error && (
        <p className="bg-red-500 text-lg p-3 rounded">{error}</p>
      )}
        <div className="flex justify-center items-center">
        <Image
        src="/isotipodos.png"
        width={150}
        height={150}
        />
        </div>
        <label htmlFor="email" className="text-slate-500 mb-2 block  text-sm" >Correo electrónico:</label>
        <input type="email"
          {...(register("email", {
            required: {
              value: true,
              message: 'Correo electrónico requerido'
            }
          }))}
          className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
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
          className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
          placeholder="**********"

        />
        {
          errors.password && (
            <span
              className="text-red-500 text-sm">{errors.password.message}</span>
          )
        }
        <button className="w-full  bg-custom-blue text-white hover:bg-custom-green hover:text-custom-blue p-3 rounded-lg mt-2"
        >
          INICIAR SESIÓN
        </button>
      </form>

    </div>
  )
}

export default LoginPage;