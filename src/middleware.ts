import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isPublicPath = path === '/login' || path === '/signup';

  // ✅ Always redirect `/` to `/signup`
  if (path === '/') {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  // 🔁 If user is logged in and tries to go to login/signup, send to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 🔐 If user is NOT logged in and tries to visit protected route
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// This matcher tells Next.js to run the middleware on all routes except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

