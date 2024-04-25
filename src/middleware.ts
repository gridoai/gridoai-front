import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { chainMiddlewares } from "./lib/chainMiddleware";

const I18nMiddleware = createI18nMiddleware({
  locales: [`en`, `pt`],
  defaultLocale: `pt`,
  urlMappingStrategy: `redirect`,
});

const auth = authMiddleware({
  signInUrl: `/(..)/sign-in`,
  publicRoutes: [`/(..)/sign-in`, `/(..)/sign-up`, `/(..)`],
  ignoredRoutes: [`/(..)/privacy`, `/(..)`, `/(..)/monitoring`, `/monitoring`],
});

export default chainMiddlewares([[I18nMiddleware], [auth]]);

export const config = {
  matcher: [`/((?!api|static|.*\..*|_next|robots.txt|monitoring|remote).*)`],
};
