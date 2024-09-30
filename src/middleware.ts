import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";  // Get the token value
  console.log(token);
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/' || path === '/signup' || path === '/verify';
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
  // Redirect if no token or invalid token
}

// Apply the middleware to routes that need protection
export const config = {
  matcher: [
    "/",
    "/home",
    "/verify",
    "/signup"
  ],
};
