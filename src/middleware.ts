import { authMiddleware } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
const I18nMiddleware = createI18nMiddleware([`en`, `pt`] as const, `pt`);

const i18nMiddleware = (req: NextRequest) =>
  req.url.match(/\/remote\/|_axiom|robots/) ? null : I18nMiddleware(req);

export default authMiddleware({
  signInUrl: `/sign-in`,
  publicRoutes: [`/`, `/sign-in`, `/sign-up`],
  ignoredRoutes: [`/privacy`, `/`],
  beforeAuth: i18nMiddleware,
});
export const config = {
  matcher: [`/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)`],
};
