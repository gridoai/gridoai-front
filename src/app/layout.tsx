import { SpeedInsights } from "@vercel/speed-insights/next";

const Root = async ({ children }: { children: React.ReactNode }) => (
  <>
    <SpeedInsights />
    {children}
  </>
);
export default Root;
