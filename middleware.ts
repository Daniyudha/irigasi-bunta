import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow access to the login page without authentication
    if (req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.next();
    }

    // For other admin routes, check if user is authenticated
    const token = req.nextauth.token;
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check user role for admin access
    if (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // This is handled in the function above
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};