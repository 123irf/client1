import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth

  const protectedPaths = ["/cart"]
  const authPaths = ["/login", "/signup"]

  const { pathname } = req.nextUrl

  // Don't interfere with Sanity Studio
  if (pathname.startsWith("/studio")) {
    return NextResponse.next()
  }

  // Redirect logged-in users away from login/signup
  if (isLoggedIn && authPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Protect routes that require authentication
  if (!isLoggedIn && protectedPaths.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|Logo\\.png|.*\\.svg$).*)",
  ],
}
