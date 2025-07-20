// Crea un archivo llamado check-passwords.js en la raíz de tu proyecto

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function checkPasswords() {
  const users = await prisma.users.findMany();
  
  console.log('=== Revisión de Contraseñas ===');
  console.log(`Total usuarios: ${users.length}`);
  
  let needsMigration = 0;
  
  for (const user of users) {
    const isBcrypt = user.password.startsWith('$2a$') || 
                    user.password.startsWith('$2b$') || 
                    user.password.startsWith('$2y$');
    
    if (!isBcrypt) {
      needsMigration++;
      console.log(`[X] Usuario ${user.email} necesita migración (${user.password})`);
    } else {
      console.log(`[✓] Usuario ${user.email} ya tiene bcrypt`);
    }
  }
  
  console.log(`\nResumen: ${needsMigration} usuarios necesitan migración`);
  await prisma.$disconnect();
}

checkPasswords().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});