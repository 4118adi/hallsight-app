import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;  // Get the token value

  // Redirect if no token or invalid token
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET!);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// Apply the middleware to routes that need protection
export const config = {
  matcher: ['/home/:path*',"/home"],
};
