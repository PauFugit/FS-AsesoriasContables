// scripts/test-connection.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    const users = await prisma.users.findMany({ take: 1 })
    console.log('Conexión exitosa. Usuarios:', users.length)
  } catch (error) {
    console.error('Error de conexión:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()