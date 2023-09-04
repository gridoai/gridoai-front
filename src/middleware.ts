import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
const I18nMiddleware = createI18nMiddleware([`en`, `pt`] as const, `pt`);

const i18nMiddleware = (req: NextRequest) =>
  req.url.match(/\/remote\/|_axiom|_next/) ? null : I18nMiddleware(req);

export default authMiddleware({
  signInUrl: `/sign-in`,
  publicRoutes: [`/sign-in`, `/sign-up`, `/`],
  ignoredRoutes: [`/privacy`],
  afterAuth: (_, req) => i18nMiddleware(req),
});

export const config = {
  matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
