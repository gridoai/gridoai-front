import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  signInUrl: "/sign-in",
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  afterAuth: (_, req, response) => {
    
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
