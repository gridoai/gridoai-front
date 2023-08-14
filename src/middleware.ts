import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

function urlMiddleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(`x-url`, request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export default authMiddleware({
  signInUrl: `/sign-in`,
  publicRoutes: [`/`, `/sign-in`, `/sign-up`],
  ignoredRoutes: [`/privacy`],
  beforeAuth: urlMiddleware,
});

export const config = {
  matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
