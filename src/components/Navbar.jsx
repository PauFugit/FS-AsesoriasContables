import Link from "next/link";
import { getServerSession } from "next-auth/next";
import Image from 'next/image';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NavbarMobileMenu from './NavbarMobileMenu';

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-custom-blue bg-opacity-65 text-white px-4 sm:px-6 lg:px-8 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logouno.png"
            alt="Logo Asesorías Valdivia"
            width={300}
            height={300}
            priority
            className="w-28 sm:w-36 lg:w-48"
          />
        </Link>
        <NavbarMobileMenu session={session} />
      </div>
    </nav>
  );
}

export default Navbar;