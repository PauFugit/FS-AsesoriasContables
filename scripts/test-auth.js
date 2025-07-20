// scripts/test-auth.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function testAuth(email, password) {
  try {
    console.log(`\nProbando login para: ${email}`)
    
    // 1. Buscar usuario
    const user = await prisma.users.findUnique({
      where: { email }
    })
    console.log('Usuario encontrado:', user ? '✓' : '✗')

    // 2. Verificar contraseña
    if (user) {
      const valid = await bcrypt.compare(password, user.password)
      console.log('Contraseña válida:', valid ? '✓' : '✗')
    }

    // 3. Simular NextAuth
    const mockCredentials = { email, password }
    const mockReq = {}
    const authResult = await authorize(mockCredentials, mockReq)
    console.log('Resultado autorización:', authResult)
    
  } catch (error) {
    console.error('Error durante prueba:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

// Copia tu función authorize desde [...nextauth]/route.js aquí
async function authorize(credentials, req) {
  // Pega aquí el contenido completo de tu función authorize
}

// Prueba con tus usuarios
testAuth('fake@correo.cl', '123')
testAuth('admin@asesoriasvaldivia.cl', 'pass123')