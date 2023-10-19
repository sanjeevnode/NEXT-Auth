import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublic =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path === "/verifyemail";

  const token = request.cookies.get("token") || "";

  // if (path.startsWith("/profile/") && !token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:id*",
    "/login",
    "/signup ,/verifyemail",
  ],
};
