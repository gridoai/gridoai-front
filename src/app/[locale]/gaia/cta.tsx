import { whatsappBotLink } from "@/app/links";
import { Button } from "@/components/ui/button";
import { getScopedI18n } from "@/locales/server";
import Link from "next/link";

export const CTA = async () => {
  const t = await getScopedI18n(`gaiaLandingPage.cta`);
  return (
    <div className="bg-black p-8 mb-10 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
      <h2 className="text-white text-4xl md:text-6xl tracking-tight">
        {t(`title`)}
      </h2>
      <p className="text-slate-400 mt-4 text-lg md:text-xl">
        {t(`description`)}
      </p>
      <div className="flex mt-5">
        <Link href={whatsappBotLink}>
          <Button className="bg-white text-slate-900" size="lg">
            {t(`buttonText`)}
          </Button>
        </Link>
      </div>
    </div>
  );
};
