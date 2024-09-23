'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"

export default function CotizaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const onSubmit = async data => {
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const response = await fetch("https://newasesoriasvaldivia.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Error al enviar el formulario")
      }

      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError(
        "Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-transparent rounded-xl">
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-lg font-medium text-custom-blue"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre", { required: "Este campo es requerido" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.nombre && (
            <p className="mt-1 text-lg text-red-600">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="apellido"
            className="block text-lg font-medium text-custom-blue"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            {...register("apellido", { required: "Este campo es requerido" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.apellido && (
            <p className="mt-1 text-lg text-red-600">
              {errors.apellido.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="correo"
            className="block text-lg font-medium text-custom-blue"
          >
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            {...register("correo", {
              required: "Este campo es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico inválido"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.correo && (
            <p className="mt-1 text-sm text-red-600">{errors.correo.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="block text-lg font-medium text-custom-blue"
          >
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
          {errors.telefono && (
            <p className="mt-1 text-lg text-red-600">
              {errors.telefono.message}
            </p>
          )}
        </div>
{/* qué servicios deseas cotizar? */}
<div>
          <label
            htmlFor="servicio"
            className="block text-lg font-medium text-custom-blue py-1"
          >
            ¿Qué servicio deseas cotizar?
          </label>
          <select
            id="servicio"
            {...register("servicio", { required: "Este campo es requerido" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Selecciona una opción: </option>
            <option value="contable">Asesoría Contable</option>
            <option value="impueslaboraltos">Asesoría Laboral</option>
            <option value="tributaria">Asesoría Tributaria </option>
            <option value="auditorias">Auditorías</option>
          </select>
          {errors.servicio && (
            <p className="mt-1 text-lg text-red-600">{errors.servicio.message}</p>
          )}
        </div>


        <div>
          <label
            htmlFor="mensaje"
            className="block text-lg font-medium text-custom-blue"
          >
            Mensaje:
          </label>
          <textarea
            id="mensaje"
            {...register("mensaje", { required: "Este campo es requerido" })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
          {errors.mensaje && (
            <p className="mt-1 text-lg text-red-600">
              {errors.mensaje.message}
            </p>
          )}
        </div>



        <div className="flex items-center">
        <Image
          src="/flechaazulderecha.png"
          alt="Button image"
          width={70}
          height={70}
          className="rounded-full"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center px-3 py-1 border border-transparent text-2xl font-medium rounded-full shadow-sm text-custom-white bg-custom-blue hover:bg-custom-green hover:text-custom-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            {isSubmitting ? "Enviando..." : "Enviar"}
            
        </button>
        </div>
      </form>

      {submitError && (
        <p className="mt-4 text-lg text-red-600">{submitError}</p>
      )}

      {submitSuccess && (
        <p className="mt-4 text-lg text-custom-green font-bold">
          Formulario enviado con éxito. Gracias por contactarnos.
        </p>
      )}
    </div>
  )
}
