import { authMiddleware, withClerkMiddleware } from "@clerk/nextjs";

export default withClerkMiddleware();
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
