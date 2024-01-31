import Image from "next/image";
import Link from "next/link";

import { Chat, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { getScopedI18n } from "@/locales/server";

const GaiaHero = async () => {
  const t = await getScopedI18n(`gaiaLandingPage`);

  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24">
      <div className="py-6 md:order-1 hidden md:block">
        <Image
          src={`https://gloriumtech.com/wp-content/uploads/2022/09/cover.png`}
          alt={t(`hero.demoImgAlt`)}
          width={620}
          height={400}
          sizes="(max-width: 800px) 100vw, 620px"
          loading="eager"
          priority
        />
      </div>
      <div>
        <h1 className="text-5xl text-slate-900 lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
          {t(`hero.title`)}
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          {t(`hero.description`)}
        </p>
        <div className="mt-6  flex flex-col sm:flex-row gap-3">
          <Link
            href="/add-to-whatsapp"
            className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-black text-white hover:bg-gray-800  border-2 border-transparent flex gap-1 items-center font-medium justify-center"
          >
            <WhatsappLogo className="text-white w-5 h-5" />
            {t(`hero.callToAction`)}
          </Link>
          {/* Uncomment if needed:
          <Link href="https://github.com/surjithctly/astroship" className="flex gap-1 items-center justify-center">
            <IconName className="text-black w-4 h-4">bx:bxl-github</IconName>
            {t('hero.secondaryCallToAction')}
          </Link>
          */}
        </div>
      </div>
    </main>
  );
};

export default GaiaHero;
