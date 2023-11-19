import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { chainMiddlewares } from "./lib/chainMiddleware";

const I18nMiddleware = createI18nMiddleware({
  locales: [`en`, `pt`],
  defaultLocale: `pt`,
  resolveLocaleFromRequest(request) {
    return request.nextUrl.pathname.startsWith(`/pt`) ? `pt` : `en`;
  },
  urlMappingStrategy: `redirect`,
});

const i18nMiddleware = (req: NextRequest) =>
  req.url.match(/\/remote\/|_axiom|_next|monitoring|favicon.ico/)
    ? null
    : I18nMiddleware(req);

const auth = authMiddleware({
  signInUrl: `/(..)/sign-in`,
  publicRoutes: [`/(..)/sign-in`, `/(..)/sign-up`, `/(..)`],
  ignoredRoutes: [`/(..)/privacy`, `/(..)`, `/(..)/monitoring`],
});

export default chainMiddlewares([[i18nMiddleware], [auth]]);

export const config = {
  matcher: [`/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)`],
};
