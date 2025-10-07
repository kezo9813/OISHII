import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "oishii_auth";
const AUTH_VALUE = "granted";
const PUBLIC_PATHS = ["/unlock", "/_next", "/favicon", "/icon.svg", "/manifest.json", "/assets", "/api/public"];
const PUBLIC_FILE = /\.[^.]+$/;

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  const isPublicPath =
    PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`)) ||
    PUBLIC_FILE.test(pathname);

  if (isPublicPath) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get(AUTH_COOKIE)?.value === AUTH_VALUE;

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const redirectUrl = nextUrl.clone();
  redirectUrl.pathname = "/unlock";
  if (pathname !== "/unlock") {
    redirectUrl.searchParams.set("from", `${pathname}${nextUrl.search}`);
  }

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.json|sw.js).*)"]
};
