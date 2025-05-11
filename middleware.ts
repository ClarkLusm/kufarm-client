import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
// import { cookies } from "next/headers";

const protectedRoutes = [
  "/dashboard",
  "/buy",
  "/history",
  "/invoice",
  "/referral",
  "/withdraw",
  "/reinvest",
];

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const pathname = request.nextUrl.pathname;
  const isAuthPage = protectedRoutes.includes(pathname);
  const isValidToken = session && !session.error;
  console.log("isValidToken", session, pathname, isAuthPage);

  if (!isValidToken && isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  if (isValidToken && pathname == "/auth/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // if (!isValidToken) {
  //   (await cookies()).delete("next-auth.session-token"); // dev
  //   (await cookies()).delete("__Secure-next-auth.session-token"); // prod
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
