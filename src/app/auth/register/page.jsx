'use client'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    // redirigir login
    const router = useRouter();
    //guardar datos
    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert("Las contraseñas no coinciden")
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                password: data.password,
                phone: data.phone,
                role: data.role,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //mandar al login
        if (response.ok) {
            router.push("/auth/login");
        }
    });

    console.log(errors);
    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-bold text-4xl mb-4">
                    Registro de Usuario
                </h1>
                <label htmlFor="username" className="text-slate-500 mb-2 block  text-sm" >Usuario</label>
                <input type="text"
                    {...(register("username", {
                        required: {
                            value: true,
                            message: 'Usuario requerido'
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="Tu usuario"
                />
                {
                    errors.username && (
                        <span
                            className="text-red-500 text-sm">{errors.username.message}</span>
                    )
                }

                <label htmlFor="email" className="text-slate-500 mb-2 block  text-sm" >Correo Electrónico:</label>
                <input type="email"
                    {...(register("email", {
                        required: {
                            value: true,
                            message: "Correo electrónico requerido.",
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

                <label htmlFor="name" className="text-slate-500 mb-2 block  text-sm" >Nombre:</label>
                <input type="text"
                    {...(register("name", {
                        required: {
                            value: true,
                            message: 'Nombre requerido'
                        }
                    }))}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="Tu nombre"
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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="Tu apellido"
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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="Define al usuario como TEAM O CLIENT"
                />
                {
                    errors.role && (
                        <span
                            className="text-red-500 text-sm">{errors.role.message}</span>
                    )
                }



                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
                >
                    Register
                </button>
            </form>
        </div>
    )

}

export default RegisterPage;


