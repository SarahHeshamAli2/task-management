import { NextResponse } from "next/server";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export function setAuthCookies(
  response: NextResponse,
  tokens: Tokens,
  isPersistent: boolean,
  existingUser?: string,
) {
  const sessionMaxAge = isPersistent ? 60 * 60 * 24 * 30 : 60 * 3;
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set("access_token", tokens.access_token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });

  response.cookies.set("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAge,
  });

  if (existingUser) {
    response.cookies.set("user", existingUser, {
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: sessionMaxAge,
    });
  }
}
