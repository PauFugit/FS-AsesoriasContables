
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState(null)

  const onSubmit = handleSubmit(async data => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden")
    }

    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("name", data.name)
    formData.append("lastname", data.lastname)
    formData.append("password", data.password)
    formData.append("phone", data.phone)
    formData.append("role", data.role)
    if (data.image[0]) {
      formData.append("image", data.image[0])
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData
    })

    if (response.ok) {
      router.push("/auth/login")
    } else {
      const errorData = await response.json()
      console.log("Registration failed:", errorData)
      alert(errorData.message || "Registration failed. Please try again.")
    }
  })

  const handleImageChange = e => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="bg-custom-blue text-white text-center py-16"></div>
      <div
        className="flex justify-center items-center py-10"
        style={{
          backgroundImage: "url('/fondodegradado.png')",
          backgroundSize: "cover"
        }}
      >
        <form onSubmit={onSubmit} className="w-1/2">
          <h1 className="text-custom-blue font-bold text-4xl mb-4">
            Registro de Usuarios
          </h1>
                <label htmlFor="username" className="text-slate-500 mb-2 block  text-sm" >Usuario</label>
                <input type="text"
                    {...(register("username", {
                        required: {
                            value: true,
                            message: 'Usuario requerido'
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
                    placeholder="Nombre de usuario"
                />
                {errors.username && 
                (<span className="text-red-500 text-sm">{errors.username.message}</span>)}

                <label htmlFor="email" className="text-slate-500 mb-2 block  text-sm" >Correo Electrónico:</label>
                <input type="email"
                    {...(register("email", {
                        required: {
                            value: true,
                            message: "Correo electrónico requerido.",
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

                <label htmlFor="name" className="text-slate-500 mb-2 block  text-sm" >Nombre:</label>
                <input type="text"
                    {...(register("name", {
                        required: {
                            value: true,
                            message: 'Nombre requerido'
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
                    placeholder="Nombre del Usuario"
                />
                {
                    errors.username && (
                        <span
                            className="text-red-500 text-sm">{errors.username.message}</span>
                    )
                }

                <label htmlFor="lastname" className="text-slate-500 mb-2 block  text-sm" >Apellido:</label>
                <input type="text"
                    {...(register("lastname", {
                        required: {
                            value: true,
                            message: 'Apellido requerido'
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
                    placeholder="Apellido del Usuario"
                />
                {
                    errors.username && (
                        <span
                            className="text-red-500 text-sm">{errors.username.message}</span>
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

                <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block  text-sm" >Confirma tu contraseña:</label>
                <input type="password"
                    {...(register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Confirmación de contraseña requerida."
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
                    placeholder="**********"

                />
                {
                    errors.confirmPassword && (
                        <span
                            className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                    )
                }
                 <label htmlFor="phone" className="text-slate-500 mb-2 block  text-sm" >Teléfono:</label>
                <input type="text"
                    {...(register("phone", {
                        required: {
                            value: true,
                            message: "Teléfono requerido."
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
                    placeholder="123456789"

                />
                {
                    errors.phone && (
                        <span
                            className="text-red-500 text-sm">{errors.phone.message}</span>
                    )
                }

                <label htmlFor="role" className="text-slate-500 mb-2 block  text-sm" >Ingresa el rol del usuario</label>
                <input type="text"
                    {...(register("role", {
                        required: {
                            value: true,
                            message: "Rol de usuario requerido."
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
                    placeholder="Define al usuario como TEAM O CLIENT"
                />
                {
                    errors.role && (
                        <span
                            className="text-red-500 text-sm">{errors.role.message}</span>
                    )
                }
                <label htmlFor="image" className="text-slate-500 mb-2 block text-sm">
            Imagen de perfil:
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="p-3 rounded block mb-2 bg-custom-white text-custom-blue w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 rounded-full w-24 h-24 object-cover"
            />
          )}

          <button className="w-full bg-custom-blue text-white p-3 rounded-lg mt-2 hover:bg-custom-green hover:text-custom-blue">
            REGISTRAR
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;