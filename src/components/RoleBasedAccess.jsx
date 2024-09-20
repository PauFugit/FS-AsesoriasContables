'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RoleBasedAccess = ({ children, allowedRoles }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      console.log("Authenticated session:", session);
      if (!session.user.role || !allowedRoles.includes(session.user.role)) {
        console.log("Unauthorized access, redirecting");
        router.push('/unauthorized')
      }
    } else if (status === 'unauthenticated') {
      console.log("Unauthenticated, redirecting to login");
      router.push('/auth/login')
    }
  }, [status, session, router, allowedRoles])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || !session.user || !session.user.role) {
    return null
  }

  if (!allowedRoles.includes(session.user.role)) {
    return null
  }

  return <>{children}</>
}

export default RoleBasedAccess