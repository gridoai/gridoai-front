import { auth } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { landingPageContent } from "./[locale]/page";
import { AuthProtectedBtn } from "./AuthProtectedBtn";
import Link from "next/link";
import { getScopedI18n } from "../locales/server";

export async function Navbar() {
  const t = await getScopedI18n(`landingPage`);
  return (
    <nav className=" fixed w-full z-10 flex items-center backdrop-blur-md bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
      <div className="text-2xl font-bold flex justify-between">
        {t(`navTitle`)}
      </div>
      <AuthProtectedBtn>
        <Link href="/chat">
          <Button className="transparent" variant="outline">
            {t(`chatNow`)}
          </Button>
        </Link>
      </AuthProtectedBtn>
    </nav>
  );
}
