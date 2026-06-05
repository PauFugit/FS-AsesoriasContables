'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el formulario")
      }

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError("Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-transparent rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm sm:text-base font-medium text-custom-blue">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre", { required: "Este campo es requerido" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
        </div>

        <div>
          <label htmlFor="apellido" className="block text-sm sm:text-base font-medium text-custom-blue">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            {...register("apellido", { required: "Este campo es requerido" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>}
        </div>

        <div>
          <label htmlFor="correo" className="block text-sm sm:text-base font-medium text-custom-blue">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            {...register("correo", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico inválido"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.correo && <p className="mt-1 text-sm text-red-600">{errors.correo.message}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm sm:text-base font-medium text-custom-blue">
            Teléfono:
          </label>
          <input
            type="tel"
            id="telefono"
            {...register("telefono", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Por favor, ingrese solo números"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>}
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm sm:text-base font-medium text-custom-blue">
            Mensaje:
          </label>
          <textarea
            id="mensaje"
            {...register("mensaje", { required: "Este campo es requerido" })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
          {errors.mensaje && <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Image
            src="/flechaazulderecha.png"
            alt="Flecha derecha"
            width={70}
            height={70}
            className="rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-[70px] md:h-[70px]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-3 py-1.5 sm:py-2 border border-transparent text-sm sm:text-base md:text-lg font-medium rounded-full shadow-sm text-custom-white bg-custom-blue hover:bg-custom-white hover:text-custom-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>

      {submitError && <p className="mt-4 text-sm sm:text-base text-red-600">{submitError}</p>}
      {submitSuccess && (
        <p className="mt-4 text-sm sm:text-base text-green-600">
          Formulario enviado con éxito. Gracias por contactarnos.
        </p>
      )}
    </div>
  )
}
