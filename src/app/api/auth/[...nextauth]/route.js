import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "correo@ejemplo.cl" },
                password: { label: "Password", type: "password", placeholder: "**********" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }

                const userFound = await prisma.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error('No se ha encontrado al usuario.')

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                if (!matchPassword) throw new Error('Contraseña incorrecta.')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                    role: userFound.role,
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id
            token.role = user.role
          }
          return token
        },
        async session({ session, token }) {
          if (token) {
            session.user.id = token.id
            session.user.role = token.role
          }
          return session
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };