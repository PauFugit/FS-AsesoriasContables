'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import AdminDashboard from '@/components/AdminDashboard'
import TeamDashboard from '@/components/TeamDashboard'
import ClientDashboard from '@/components/ClientDashboard'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div>
      <div className="bg-custom-blue py-14"></div>
      <RoleBasedAccess allowedRoles={['ADMIN', 'TEAM', 'CLIENT']}>
        {session?.user?.role === 'ADMIN' && <AdminDashboard />}
        {session?.user?.role === 'TEAM' && <TeamDashboard />}
        {session?.user?.role === 'CLIENT' && <ClientDashboard />}
      </RoleBasedAccess>
    </div>
  )
}
