import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/routes";
import { NextRequest } from "next/server";
import { getUrl } from "@/lib/get-url";

const { auth } = NextAuth(authConfig);

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const isLoggedIn = token ? true : false;
  const pathname = request.nextUrl.pathname;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isPublicRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(getUrl(DEFAULT_LOGIN_REDIRECT)), 301);
    }
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(getUrl(DEFAULT_LOGIN_REDIRECT)), 301);
    }
    return Response.redirect(new URL(getUrl("/auth/login")), 301);
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
