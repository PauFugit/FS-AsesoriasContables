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
    "Servicios de Asesoría Contable, Laboral, Tributaria y Auditorías.",
  charset: "utf-8",
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