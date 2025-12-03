export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth/login", "/auth/signup", "/home"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  if (session && !isProtectedRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
}
