import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // CRITICAL FIX: Skip middleware for admin routes
  // Admin routes have their own auth logic in layout.tsx
  if (pathname.startsWith("/admin")) {
    console.log("🛡️ Middleware: Skipping admin route", pathname);
    return NextResponse.next();
  }

  // Handle other protected routes (if any)
  if (pathname.startsWith("/protected")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users from public auth pages
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // FIXED: Remove /admin/:path* from matcher since admin has own auth
  matcher: ["/protected/:path*", "/login"],
};
