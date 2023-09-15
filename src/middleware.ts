import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { chainMiddlewares } from "./lib/chainMiddleware";
const I18nMiddleware = createI18nMiddleware([`en`, `pt`] as const, `pt`);

const i18nMiddleware = (req: NextRequest) =>
  req.url.match(/\/remote\/|_axiom|_next/) ? null : I18nMiddleware(req);
const middleware = chainMiddlewares([
  [i18nMiddleware],
  [
    authMiddleware({
      signInUrl: `/sign-in`,
      publicRoutes: [`/sign-in`, `/sign-up`, `/`],
      ignoredRoutes: [`/privacy`, `/`],
    }),
  ],
]);
export default middleware;

export const config = {
  matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
