import {Router} from 'express'
import { Prisma, PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/users', async (req, res)=>{
    const users = await prisma.user.findMany()
    res.json('users')
})

export default router;
