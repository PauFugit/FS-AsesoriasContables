import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import { Providers } from './providers'
import "./globals.css";
import './styles/navbar.css';
import Footer from "@/components/Footer";

const OverusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk-VF.woff",
  variable: "--font-overused-grotesk",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Asesorías Valdivia",
    template: "%s | Asesorías Valdivia"
  },
  description:
    "Asesorías Valdivia — Servicios de Asesoría Contable, Laboral, Tributaria y Auditorías en Antofagasta, Chile.",
  keywords: ["asesoría contable", "asesoría tributaria", "asesoría laboral", "auditorías", "Antofagasta", "Chile"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.asesoriasvaldivia.cl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'Asesorías Valdivia',
    title: 'Asesorías Valdivia',
    description: 'Servicios de Asesoría Contable, Laboral, Tributaria y Auditorías en Antofagasta, Chile.',
    images: [{ url: '/logouno.png', width: 300, height: 300, alt: 'Asesorías Valdivia' }],
  },
  twitter: {
    card: 'summary',
    title: 'Asesorías Valdivia',
    description: 'Servicios de Asesoría Contable, Laboral, Tributaria y Auditorías en Antofagasta, Chile.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico"
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      
      <body className={`${OverusedGrotesk.variable} font-sans`}>
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}