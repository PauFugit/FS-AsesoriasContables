import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import db from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder:"correo@ejemplo.cl"},
                password:{label:"Password", type:"password", placeholder:"**********"},
                //role:{},
            },
            async authorize(credentials, req){
                console.log(credentials)
                
                const userFound = await db.user.findUnique({
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
                    //role: userFound.role
                }
            },
        }),
    ],
    pages:{
        signIn:"/auth/login",
        error: "/auth/error"
    },
   // callbacks: {
        // Callback para agregar el rol al objeto de sesión
    //    async session({ session, user }) {
          // Buscar el rol del usuario en la base de datos o pasarlo directamente desde user.role
    //      const userInDB = await db.user.findUnique({
    //        where: { email: session.user.email },
      //    });
    
          // Agregar rol al objeto session
     //     session.user.role = userInDB?.role || "CLIENT"; // Rol predeterminado si no existe
    
       //   return session;
      //  },
   // },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};