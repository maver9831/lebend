import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Percorsi che richiedono autenticazione
  const protectedPaths = ["/"]

  // Percorsi di autenticazione
  const authPaths = ["/auth/login", "/auth/register"]

  const { pathname } = request.nextUrl

  // Se siamo su un percorso protetto, reindirizza al login
  if (protectedPaths.includes(pathname)) {
    // In un'app reale, controlleresti qui il token di autenticazione
    // Per ora, lasciamo che il client gestisca il redirect
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
