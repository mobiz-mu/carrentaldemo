import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth-constants";

// Protect the admin dashboard. The login page and auth API stay public.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed =
    request.cookies.get(ADMIN_COOKIE)?.value === ADMIN_SESSION_VALUE;

  // Already logged in but visiting the login page → send to dashboard.
  if (pathname === "/admin/login" && isAuthed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Any other /admin route requires auth.
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !isAuthed
  ) {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
