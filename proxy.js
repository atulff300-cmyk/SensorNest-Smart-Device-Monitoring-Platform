import { NextResponse } from 'next/server';

export function proxy(request) {
  // Check if the user is authenticated by looking for the custom cookie
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  // If the user is trying to access the dashboard without being authenticated,
  // redirect them to the login page.
  if (request.nextUrl.pathname.startsWith('/dashboard') && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
