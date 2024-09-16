import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import ClientDashboard from './dashboard/ClientDashboard'
import prisma from '../lib/prisma'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return null // We'll handle this in the client component
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user || user.role !== 'CLIENT') {
    return null // We'll handle this in the client component
  }

  return <ClientDashboard initialUser={user} />
}