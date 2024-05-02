import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { chainMiddlewares } from "./lib/chainMiddleware";

const I18nMiddleware = createI18nMiddleware({
  locales: [`en`, `pt`],
  defaultLocale: `pt`,
  urlMappingStrategy: `redirect`,

});
const isProtectedRoute = createRouteMatcher([
  `/(..)/chat`,
  `/(..)/documents`,
  `/chat`,
  `/documents`,
]);

const auth = clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export default chainMiddlewares([[I18nMiddleware], [auth]]);

export const config = {
  matcher: [`/((?!api|static|.*\..*|_next|robots.txt|monitoring|remote).*)`],
};
