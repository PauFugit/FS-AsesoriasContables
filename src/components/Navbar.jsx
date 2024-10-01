import Link from "next/link";
import { getServerSession } from "next-auth/next";
import Image from 'next/image';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CircleUserRound, LogOut } from 'lucide-react';

async function Navbar() {
  const session = await getServerSession(authOptions);

  const NavLink = ({ href, children, className = "" }) => (
    <li className="w-full lg:w-auto">
      <Link href={href} className={`flex items-center hover:bg-custom-blue hover:text-custom-white py-1 px-4 rounded transition-colors duration-200 ${className}`}>
        <Image
          src="/flechaverdederecha.png"
          alt="Flecha verde hacia la derecha"
          width={25}
          height={25}
          className="mr-2"
        />
        <span>{children}</span>
      </Link>
    </li>
  );

  return (
    <nav className="bg-custom-blue bg-opacity-65 text-white px-4 sm:px-6 lg:px-8 py-3 fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logouno.png"
            alt="Logo Asesorías Valdivia"
            width={300}
            height={300}
            priority
            className=""
          />
        </Link>

        <input type="checkbox" id="menu-toggle" className="hidden" />
        <label htmlFor="menu-toggle" className="lg:hidden cursor-pointer">
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>

        <ul className="w-full lg:w-auto flex-grow lg:items-center lg:justify-end hidden lg:flex flex-col lg:flex-row gap-2 lg:gap-6 mt-4 lg:mt-0">
          {!session?.user ? (
            <>
              <NavLink href="/nosotros">¿Quiénes somos?</NavLink>
              <NavLink href="/servicios">Servicios</NavLink>
              <NavLink href="/noticias">Noticias</NavLink>
              <NavLink href="/contacto">Contacto</NavLink>
              <li className="w-full lg:w-auto">
                <Link href="/auth/login" className="flex items-center hover:bg-custom-green lg:hover:text-custom-green px-3 py-2 rounded transition-colors duration-200">
                <CircleUserRound className="w-5 h-5 mr-2 text-custom-green" />
                </Link>
              </li>
            </>
          ) : (
            <>
              {session?.user?.role === 'CLIENT' && (
                <NavLink href="/nosotros">¿Quiénes somos?</NavLink>)}
              {session?.user?.role === 'CLIENT' && (
              <NavLink href="/servicios">Servicios</NavLink>)}
              {session?.user?.role === 'CLIENT' && (
              <NavLink href="/contacto">Contacto</NavLink>)}
              {session?.user?.role === 'CLIENT' && (
              <NavLink href="/noticias">Noticias</NavLink>)}
              {session?.user?.role != 'CLIENT' && (
              <NavLink href="/">Página de Inicio</NavLink>)}
              
              <NavLink href="/dashboard">Panel de Usuario</NavLink>
              {session?.user?.role === 'ADMIN' && (
              <NavLink href="/auth/register">Registrar nuevo usuario</NavLink>)}
              <Link href="/api/auth/signout"><LogOut className="w-4 h-4 mr-2 text-custom-white" /></Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;