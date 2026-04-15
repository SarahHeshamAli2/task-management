import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, verifyToken } from "./lib/actions/auth.actions";

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const loginUrl = new URL("/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  const authPages = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authPages.includes(request.nextUrl.pathname);

  // validate access token
  if (accessToken) {
    const valid = await verifyToken(accessToken);

    if (valid) {
      // logged user should not access auth pages
      if (isAuthPage) {
        return NextResponse.redirect(dashboardUrl);
      }

      return NextResponse.next();
    }
  }

  // try refresh token
  if (refreshToken) {
    const newTokens = await refreshAccessToken(refreshToken);

    if (newTokens) {
      const response = isAuthPage
        ? NextResponse.redirect(dashboardUrl)
        : NextResponse.next();

      response.cookies.set("access_token", newTokens.access_token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
      });

      response.cookies.set("refresh_token", newTokens.refresh_token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }
  }

  // user not authenticated
  if (!isAuthPage) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /* * Match all request paths except for the ones starting with: * - api (API routes) * - _next/static (static files) * - _next/image (image optimization files) * - favicon.ico, sitemap.xml, robots.txt (metadata files) */ "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
