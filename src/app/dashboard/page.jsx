'use client'

import { useSession } from 'next-auth/react'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import AdminDashboard from '@/components/AdminDashboard'
import TeamDashboard from '@/components/TeamDashboard'
import ClientDashboard from '@/components/ClientDashboard'

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <RoleBasedAccess allowedRoles={['ADMIN']}>
        <AdminDashboard />
      </RoleBasedAccess>
      <RoleBasedAccess allowedRoles={['TEAM']}>
        <TeamDashboard />
      </RoleBasedAccess>
      <RoleBasedAccess allowedRoles={['CLIENT']}>
        <ClientDashboard />
      </RoleBasedAccess>
    </div>
  )
}