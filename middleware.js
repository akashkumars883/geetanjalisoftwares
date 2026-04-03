import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get('admin_session');

  // Protect /dashboard and /leads
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/leads')) {
    if (!adminSession || adminSession.value !== 'true') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent logged-in users from visiting /login
  if (pathname === '/login' && adminSession?.value === 'true') {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/leads/:path*', '/login'],
};
