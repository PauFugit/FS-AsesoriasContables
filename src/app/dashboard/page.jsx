'use client'

import { useSession } from 'next-auth/react'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import AdminDashboard from '@/components/AdminDashboard'
import TeamDashboard from '@/components/TeamDashboard'
import ClientDashboard from '@/components/ClientDashboard'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  console.log("Dashboard - Session status:", status)
  console.log("Dashboard - Session data:", session)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied</div>
  }

  return (
    <div className="p-6" style={{ paddingTop:"7rem", backgroundImage: "url('/fondodegradado.png')", backgroundSize: "cover" }}>
      {/*<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {session?.user?.name} (Role: {session?.user?.role})</p>*/}
      <RoleBasedAccess allowedRoles={['ADMIN', 'TEAM', 'CLIENT']}>
        {session?.user?.role === 'ADMIN' && <AdminDashboard />}
        {session?.user?.role === 'TEAM' && <TeamDashboard />}
        {session?.user?.role === 'CLIENT' && <ClientDashboard />}
      </RoleBasedAccess>
    </div>
  )
}