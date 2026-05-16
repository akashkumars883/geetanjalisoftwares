import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get('admin_session');

  // Skip static assets, APIs, and next internal folders from wildcard routing
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/site') ||
    pathname.startsWith('/_sites') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract hostname from headers
  const hostname = request.headers.get('host') || '';

  // Determine if a custom subdomain is being accessed
  let subdomain = '';
  if (hostname.includes('localhost:3000')) {
    const parts = hostname.split('.localhost:3000');
    if (parts.length > 1 && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  } else {
    // Match against your official production domain
    const parts = hostname.split('.geetanjalisoftwares.in');
    if (parts.length > 1 && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  }

  // Prevent direct raw access to /studio or /builder on the main domain or other subdomains
  if ((pathname.startsWith('/studio') || pathname.startsWith('/builder')) && subdomain !== 'studio') {
    const redirectUrl = request.nextUrl.clone();
    if (hostname.includes('localhost:3000')) {
      redirectUrl.hostname = 'studio.localhost';
      redirectUrl.port = '3000';
    } else {
      redirectUrl.hostname = 'studio.geetanjalisoftwares.in';
    }
    // Maintain the path correctly
    if (pathname.startsWith('/builder')) {
      redirectUrl.pathname = '/builder';
    } else {
      redirectUrl.pathname = '/';
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Handle specific subdomain routing configurations
  if (subdomain) {
    if (subdomain === 'studio') {
      if (pathname.startsWith('/builder')) {
        // If user opens studio.../builder, route to the actual builder app
        return NextResponse.rewrite(new URL(`/builder${pathname.replace('/builder', '')}`, request.url));
      }
      if (pathname === '/studio') {
        const cleanUrl = request.nextUrl.clone();
        cleanUrl.pathname = '/';
        return NextResponse.redirect(cleanUrl);
      }
      // If user opens studio.geetanjalisoftwares.in, internally route to our landing page!
      const targetPath = pathname === '/' ? '/studio' : `/studio${pathname}`;
      return NextResponse.rewrite(new URL(targetPath, request.url));
    }
    // For all other client subdomains (e.g. doctorverma), render their saved Supabase profile
    return NextResponse.rewrite(new URL(`/site/${subdomain}${pathname}`, request.url));
  }

  // Protect /dashboard, /leads and /settings
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/leads') || pathname.startsWith('/settings')) {
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

// Match all paths to catch subdomains, except specified static assets
export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};
