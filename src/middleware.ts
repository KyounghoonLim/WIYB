import { NextRequest, NextResponse } from 'next/server'
import { navigationGuard } from './middleware/navigationGuard/navigationGuard.middleware'
import { PATH } from 'constants/path.constant'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.href)
  return await navigationGuard(request)
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: [
  //   '/((?!font|icon|image|api|_next/static|_next/image|favicon).*)',
  //   ...Object.values(PATH),
  // ],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!icons|images|api|_next/static|_next/image|favicon.ico).*)',
  ],
}
