import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  "/dashboard",
  "/buy",
  "/history",
  "/invoice",
  "/referral",
  "/withdraw",
  "/reinvest",
];

const publicRoutes = ["/auth/signin", "/auth/signup", "/"];

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isValidToken = session && !session.error;

  if (!isValidToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  if (
    isPublicRoute &&
    isValidToken &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
