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
      console.log("Authenticated session:", session)
      console.log("User role:", session?.user?.role)
      console.log("Allowed roles:", allowedRoles)
      
      if (session?.user?.role && allowedRoles.includes(session.user.role)) {
        console.log("Access granted")
        setIsAuthorized(true)
      } else {
        console.log("Unauthorized access, redirecting")
        router.push('/unauthorized')
      }
    } else if (status === 'unauthenticated') {
      console.log("Unauthenticated, redirecting to login")
      router.push('/auth/login')
    }
  }, [status, session, router, allowedRoles])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return isAuthorized ? <>{children}</> : null
}

export default RoleBasedAccess