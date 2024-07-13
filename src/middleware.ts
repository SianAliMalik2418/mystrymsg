import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const authPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/verify", "/"];

  if (token) {
    if (authPaths.includes(pathname))
      return NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
