'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CircleUserRound } from 'lucide-react'
import SignOutButton from './SignOutButton'

export default function NavbarMobileMenu({ session }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const NavLink = ({ href, children }) => (
    <li className="w-full lg:w-auto">
      <Link
        href={href}
        onClick={close}
        className="flex items-center hover:bg-custom-white hover:text-custom-blue py-1 px-4 rounded transition-colors duration-200"
      >
        <Image
          src="/flechaazulderecha.png"
          alt="Flecha derecha"
          width={25}
          height={25}
          className="mr-2"
        />
        <span>{children}</span>
      </Link>
    </li>
  )

  return (
    <>
      <button
        className="lg:hidden cursor-pointer"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          {open
            ? <path d="M6 18L18 6M6 6l12 12" />
            : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <ul className={`w-full lg:w-auto flex-grow lg:items-center lg:justify-end lg:flex flex-col lg:flex-row gap-2 lg:gap-6 mt-4 lg:mt-0 ${open ? 'flex' : 'hidden lg:flex'}`}>
        {!session?.user ? (
          <>
            <NavLink href="/nosotros">¿Quiénes somos?</NavLink>
            <NavLink href="/servicios">Servicios</NavLink>
            <NavLink href="/noticias">Noticias</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
            <li className="w-full lg:w-auto">
              <Link href="/auth/login" onClick={close} className="flex items-center hover:bg-custom-blue lg:hover:text-custom-blue px-3 py-2 rounded transition-colors duration-200">
                <CircleUserRound className="w-5 h-5 mr-2 text-custom-white hover:text-custom-white" />
              </Link>
            </li>
          </>
        ) : (
          <>
            {session?.user?.role === 'CLIENT' && <NavLink href="/nosotros">¿Quiénes somos?</NavLink>}
            {session?.user?.role === 'CLIENT' && <NavLink href="/servicios">Servicios</NavLink>}
            {session?.user?.role === 'CLIENT' && <NavLink href="/contacto">Contacto</NavLink>}
            {session?.user?.role === 'CLIENT' && <NavLink href="/noticias">Noticias</NavLink>}
            {session?.user?.role !== 'CLIENT' && <NavLink href="/">Página de Inicio</NavLink>}
            <NavLink href="/dashboard">Panel de Usuario</NavLink>
            {session?.user?.role === 'ADMIN' && <NavLink href="/auth/register">Registrar nuevo usuario</NavLink>}
            <SignOutButton />
          </>
        )}
      </ul>
    </>
  )
}
