import type { NextRequest } from "next/server";
import { localeMiddleware } from "./src/middleware/locale.middleware";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  switch (request.nextUrl.pathname) {
    default: {
      return localeMiddleware(request);
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next).*)"],
};
