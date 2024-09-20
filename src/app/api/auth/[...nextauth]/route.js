import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {

    providers: [
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder:"correo@ejemplo.cl"},
                password:{label:"Password", type:"password", placeholder:"**********"},
                
            },
            async authorize(credentials, req){
                console.log("Authorize function - Credentials:", credentials);
                console.log(credentials)
                
                const userFound = await prisma.users.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if(!userFound) throw new Error('No se ha encontrado al usuario.')
                console.log(userFound)

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                if(!matchPassword) throw new Error('Contraseña incorrecta.')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                    role: userFound.role,
                }
            },
        }),
    ],
    pages:{
        signIn:"/auth/login",
        error: "/auth/error"
    },
    session:{
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("JWT Callback - TOKEN:", token);
            console.log("JWT Callback - USER:", user);
          if (user) {
            token.role = user.role
          }
          return token
        },
        async session({ session, token }) {
            console.log("Session Callback - Session:", session);
            console.log("Session Callback - Token:", token);
            session.user.role = token.role
            return session
        },
      },
   
   
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};