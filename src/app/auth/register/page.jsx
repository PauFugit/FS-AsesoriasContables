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

          {/* Existing form fields */}
          {/* ... */}

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

