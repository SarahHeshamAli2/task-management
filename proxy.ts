import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, verifyToken } from "./lib/actions/auth.actions";
import { setAuthCookies } from "./lib/utils/proxy-utils";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const dashboardUrl = new URL("/project", request.url);

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const isAuthPage = authPages.includes(pathname);

  // Build login URL — preserve callbackUrl when redirecting unauthenticated users
  const buildLoginUrl = () => {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
    return loginUrl;
  };

  // After login, decide where to send the user
  const getPostLoginUrl = () => {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    if (callbackUrl && !authPages.includes(callbackUrl.split("?")[0])) {
      return new URL(callbackUrl, request.url);
    }
    return dashboardUrl;
  };

  // ── Validate access token ──────────────────────────────────────────────────
  if (accessToken) {
    const valid = await verifyToken(accessToken);
    if (valid) {
      // Logged-in user should not access auth pages
      if (isAuthPage) {
        return NextResponse.redirect(getPostLoginUrl());
      }
      return NextResponse.next();
    }
  }

  // ── Try refresh token ──────────────────────────────────────────────────────
  if (refreshToken) {
    const newTokens = await refreshAccessToken(refreshToken);
    if (newTokens) {
      const response = isAuthPage
        ? NextResponse.redirect(getPostLoginUrl())
        : NextResponse.next();

      const sessionType = request.cookies.get("session_type")?.value;
      const isPersistent = sessionType === "persistent";
      const existingUser = request.cookies.get("user")?.value;
      setAuthCookies(response, newTokens, isPersistent, existingUser);
      return response;
    }
  }

  // ── User not authenticated ─────────────────────────────────────────────────
  if (!isAuthPage) {
    return NextResponse.redirect(buildLoginUrl());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
