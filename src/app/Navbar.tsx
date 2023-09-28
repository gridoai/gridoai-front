import { auth } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { landingPageContent } from "./[locale]/page";
import { AuthProtectedBtn } from "./AuthProtectedBtn";
import Link from "next/link";
import { getScopedI18n } from "../locales/server";
import { whatsappLink } from "./links";

export async function Navbar() {
  const t = await getScopedI18n(`landingPage`);
  return (
    <nav className=" fixed w-full z-10 flex items-center backdrop-blur-md bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
      <div className="text-2xl font-bold flex justify-between">
        {t(`navTitle`)}
      </div>
      <div className="flex gap-8 items-center">
        <Link
          className="hover:border-b border-solid border-foreground duration-75 transition-all border-b-0"
          href={`${whatsappLink}?text=${t(`bePartnerMessage`)}`}
          target="_blank"
        >
          {t(`bePartner`)}
        </Link>
        <Link
          className="hover:border-b border-solid border-foreground duration-75 transition-all border-b-0"
          href="https://blog.gridoai.com"
          target="_blank"
        >
          Blog
        </Link>
        <AuthProtectedBtn>
          <Button variant="outline">
            <Link href="/chat">{t(`chatNow`)}</Link>
          </Button>
        </AuthProtectedBtn>
      </div>
    </nav>
  );
}
