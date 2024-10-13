
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        if (value[0]) formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    })

try{
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData
    })

    if (response.ok) {
      router.push("/dashboard")
    } else {
      const errorData = await response.json()
      console.log("Registration failed:", errorData)
      alert(errorData.message || "Registration failed. Please try again.")
    }
  } catch(error){
    console.error("Registration error:", error)
    alert("Un error ha ocurrido durante el registro. Por favor inténtalo nuevamente.")
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
  const fields = [
    { name: "username", label: "Usuario", type: "text", placeholder: "Nombre de usuario" },
    { name: "email", label: "Correo Electrónico", type: "email", placeholder: "correo@ejemplo.cl" },
    { name: "name", label: "Nombre", type: "text", placeholder: "Nombre del Usuario" },
    { name: "lastname", label: "Apellido", type: "text", placeholder: "Apellido del Usuario" },
    { name: "password", label: "Contraseña", type: "password", placeholder: "**********" },
    { name: "confirmPassword", label: "Confirma tu contraseña", type: "password", placeholder: "**********" },
    { name: "phone", label: "Teléfono", type: "tel", placeholder: "123456789" },
    { name: "company", label: "Empresa", type: "text", placeholder:"Nombre Empresa"},
    { name: "driveURL", label: "Link de acceso a Drive", type: "url", placeholder: "Inserta el link de acceso a drive del usuario", required: false },
    { name: "role", label: "Ingresa el rol del usuario", type: "text", placeholder: "Define al usuario como TEAM O CLIENT" },
  ]

  return (
    <div>
      <div className="bg-primary text-primary-foreground text-center py-16"></div>
      <div
        className="flex justify-center items-center py-10"
        style={{
          backgroundImage: "url('/fondodegradado.png')",
          backgroundSize: "cover"
        }}
      >
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <h1 className="text-primary font-bold text-4xl mb-4">
            Registro de Usuarios
          </h1>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="text-muted-foreground mb-2 block text-sm">
                {field.label}
              </label>
              <input
                type={field.type}
                {...register(field.name, {
                  required: field.required !== false ? `${field.label} requerido` : false
                })}
                className="p-3 rounded block mb-2 bg-background text-foreground w-full border"
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <span className="text-destructive text-sm">{errors[field.name].message}</span>
              )}
            </div>
          ))}
          <div className="mb-4">
            <label htmlFor="image" className="text-muted-foreground mb-2 block text-sm">
              Imagen de perfil:
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="p-3 rounded block mb-2 bg-background text-foreground w-full border"
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={96}
                height={96}
                className="mt-2 rounded-full object-cover"
              />
            )}
          </div>
          <button className="w-full bg-custom-blue text-custom-white p-3 rounded-lg mt-2 hover:bg-custom-white hover:text-custom-blue transition-colors">
            REGISTRAR
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;