import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-5">{children}</div>
    </div>
  );
};
export async function generateMetadata(): Promise<Metadata> {
  // read route params then fetch data
  const t = await getScopedI18n(`gaiaLandingPage`);

  // return an object
  return {
    title: t(`hero.title`),
    description: t(`hero.description`),
  };
}
export default Layout;
