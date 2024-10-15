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

    // Check for /auth/register route
    if (path === '/auth/register') {
      // If user is not logged in or doesn't have an admin role, redirect to home page
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    // Add other role-based redirects here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ['/dashboard/:path*', '/auth/register'] }