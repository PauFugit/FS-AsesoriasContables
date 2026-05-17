'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const RoleBasedAccess = ({ children, allowedRoles }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role && allowedRoles.includes(session.user.role)) {
        setIsAuthorized(true)
      } else {
        router.push('/unauthorized')
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, session, router, allowedRoles])

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  return isAuthorized ? <>{children}</> : null
}

export default RoleBasedAccess
