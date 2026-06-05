import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname
    const token = req.nextauth.token

    if (path.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if (path === '/auth/register') {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ['/dashboard/:path*', '/auth/register'] }
