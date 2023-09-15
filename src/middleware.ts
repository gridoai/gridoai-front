import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { chainMiddlewares } from "./lib/chainMiddleware";

const I18nMiddleware = createI18nMiddleware({
  locales: [`en`, `pt`],
  defaultLocale: `pt`,
  urlMappingStrategy: `redirect`,
});

const i18nMiddleware = (req: NextRequest) =>
  req.url.match(/\/remote\/|_axiom|_next/) ? null : I18nMiddleware(req);

export default authMiddleware({
  signInUrl: `/(..)/sign-in`,
  publicRoutes: [`/(..)/sign-in`, `/(..)/sign-up`, `/(..)`],
  ignoredRoutes: [`/(..)/privacy`, `/(..)`],
  beforeAuth: i18nMiddleware,
});

export const config = {
  matcher: [`/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)`],
};
