import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
const I18nMiddleware = createI18nMiddleware([`en`, `pt`] as const, `pt`);

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
	afterAuth: (_, r) => urlMiddleware(r),
	beforeAuth: I18nMiddleware,
});

export const config = {
	matcher: [`/((?!.*\\..*|_next).*)`, `/`, `/(api|trpc)(.*)`],
};
