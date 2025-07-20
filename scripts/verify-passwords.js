// verify-passwords.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function verifyPassword(user, plainPassword) {
  return await bcrypt.compare(plainPassword, user.password);
}

async function testUserLogin(email, plainPassword) {
  const user = await prisma.users.findUnique({
    where: { email }
  });

  if (!user) {
    console.log(`Usuario ${email} no encontrado`);
    return;
  }

  const isValid = await verifyPassword(user, plainPassword);
  console.log(`Login para ${email}: ${isValid ? '✓ ÉXITO' : '✗ FALLIDO'}`);
}

async function runTests() {
  // Agrega aquí usuarios de prueba con sus contraseñas en texto plano
  await testUserLogin('admin@asesoriasvaldivia.cl', 'pass123');
  await testUserLogin('fake@correo.cl', '123');
  
  await prisma.$disconnect();
}

runTests().catch(e => {
  console.error('Error en verificación:', e);
  process.exit(1);
});