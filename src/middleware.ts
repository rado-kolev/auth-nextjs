import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup';

  const token = request.cookies.get('token')?.value || '';

  
  // Redirect to home page if user is logged in and trying to access public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect to login page if user is not logged in and trying to access private paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
  ],
};
