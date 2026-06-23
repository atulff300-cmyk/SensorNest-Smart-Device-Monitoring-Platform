import { NextResponse } from 'next/server';

export async function GET(request) {
  // Redirect to home page
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Clear authentication cookies
  response.cookies.delete('isAuthenticated');
  response.cookies.delete('userId');
  
  return response;
}
