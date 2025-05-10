import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { securityHeaders } from "./utils/security-utils"

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next()

  // Apply security headers
  const headers = securityHeaders.getAll()
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except static files and api routes
    // that need different headers
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
