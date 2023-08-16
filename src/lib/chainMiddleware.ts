import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
/**
 * Chains multiple middlewares and returns a NextMiddleware function.
 * This function will execute the middlewares in order until a redirect is encountered.
 * If a middleware is associated with a route, the middleware will only be applied if the current route matches.
 * If a redirect is encountered, the execution of subsequent middlewares is halted.
 *
 * @param {MiddlewareWithRoute[]} middlewaresWithRoutes - An array of tuples. Each tuple contains a middleware and an associated route (optional).
 * A route can be a string or a RegExp object. If a middleware is associated with a route,
 * the middleware will only be applied if the current route matches the route.
 *
 * @returns {NextMiddleware}
 * @example
 *
 * // Define your middlewares
 * const middleware1: NextMiddleware = async (req, event) => {
 *  // Middleware logic...
 *  return NextResponse.next();
 * };
 *
 * const middleware2: NextMiddleware = async (req, event) => {
 *  // Middleware logic...
 *  return NextResponse.redirect('http://redirect.com');
 * };
 *
 * // Chain your middlewares
 * export const middleware = chainMiddlewares([
 *  [middleware1, '/route1'],
 *  [middleware2, '/route2'],
 * ]);
 *
 */
export const chainMiddlewares = (middlewaresWithRoutes: MiddlewareWithRoute[]): NextMiddleware => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { response: combinedResponse } = await middlewaresWithRoutes.reduce(
      async (
        acc: Promise<{ redirected: boolean; response: NextResponse | null }>,
        [middleware, route]: MiddlewareWithRoute,
      ) => {
        const { redirected, response: prevResponse } = await acc;

        if (redirected) {
          return { redirected, response: prevResponse };
        }

        const currentRoute = request.nextUrl.clone().href;

        const isMatch =
          route === undefined ||
          (typeof route === `string` ? currentRoute.includes(route) : route.test(currentRoute));

        if (isMatch) {
          const result = await middleware(request, event);
          if (result instanceof NextResponse) {
            if (result.status >= 300 && result.status < 400) {
              return { redirected: true, response: result };
            }

            const newResponse = prevResponse || NextResponse.next();

            result.headers.forEach((value, name) => newResponse.headers.set(name, value));
            result.cookies &&
              Object.entries(result.cookies).forEach(([name, options]) =>
                newResponse.cookies.set(name, options),
              );

            return { redirected: false, response: newResponse };
          }
        }

        return { redirected: false, response: prevResponse };
      },
      Promise.resolve({ redirected: false, response: null }),
    );

    return combinedResponse ?? NextResponse.next();
  };
};

type MiddlewareWithRoute = [NextMiddleware, string | RegExp] | [NextMiddleware];
