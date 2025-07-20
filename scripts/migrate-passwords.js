// Crea un archivo llamado migrate-passwords.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function migratePassword(user) {
  if (!user.password) return;
  
  // Verifica si ya está hasheada
  const isBcrypt = user.password.startsWith('$2a$') || 
                  user.password.startsWith('$2b$') || 
                  user.password.startsWith('$2y$');
  
  if (isBcrypt) return;

  console.log(`Migrando contraseña para ${user.email}`);
  
  const hashedPassword = await bcrypt.hash(user.password, 10);
  
  await prisma.users.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  });
}

async function migrateAllPasswords() {
  const users = await prisma.users.findMany();
  
  console.log(`Iniciando migración para ${users.length} usuarios`);
  
  for (const user of users) {
    try {
      await migratePassword(user);
    } catch (error) {
      console.error(`Error migrando usuario ${user.email}:`, error.message);
    }
  }
  
  console.log('Migración completada');
  await prisma.$disconnect();
}

migrateAllPasswords().catch(e => {
  console.error('Error en la migración:', e);
  process.exit(1);
});