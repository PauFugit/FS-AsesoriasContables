import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    console.log("Middleware - User:", req.nextauth.token)
    
    const path = req.nextUrl.pathname
    const token = req.nextauth.token

    if (path.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Add role-based redirects here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ['/dashboard/:path*'] }