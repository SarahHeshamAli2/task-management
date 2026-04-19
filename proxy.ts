import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, verifyToken } from "./lib/actions/auth.actions";
import { setAuthCookies } from "./lib/utils/proxy-utils";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const loginUrl = new URL("/login", request.url);
  const dashboardUrl = new URL("/project", request.url);

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const isAuthPage = authPages.includes(pathname);

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

      const sessionType = request.cookies.get("session_type")?.value;
      const isPersistent = sessionType === "persistent";

      const existingUser = request.cookies.get("user")?.value;

      setAuthCookies(response, newTokens, isPersistent, existingUser);

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
