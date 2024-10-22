import Link from "next/link";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import {
  Brain,
  CaretDown,
  Funnel,
  User,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "../Navbar";
import AnimatedComponent from "../../components/animatedWrapper";
import workspacesEn from "../../../public/workspaces.png";
import orgMembersEn from "../../../public/orgMembers.png";
import workspacesPt from "../../../public/workspacesPt.png";
import orgMembersPt from "../../../public/orgMembersPt.png";
import platforms from "../../../public/platforms.png";
import { AuthProtectedBtn } from "../AuthProtectedBtn";
import { Message } from "../../components/Chat/Message";
import { calendlyLink, whatsappLink } from "../links";
const useCases = [
  `internalDataOracle`,
  `softwareDevelopment`,
  `legalDocumentReview`,
  `businessAnalysis`,
  `projectManagement`,
  `educationalResearch`,
] as const;
import { ScopedTranslator, getI18n, getScopedI18n } from "../../locales/server";
import { JSX } from "react";
import { AuthProtectedPricingPage } from "../../components/pricing";

const iconSize = 42;
export const landingPageContent = {
  features: (
    t: ScopedTranslator<`landingPage.features`>,
    locale: `en` | `pt`
  ) => [
    {
      title: t(`dataDriven.title`),
      description: t(`dataDriven.description`),
      icon: <Brain size={iconSize} />,
      image: (
        <div>
          <Message
            content={t(`dataDriven.example.question1`)}
            type={`userMessage`}
            sources={``}
            loading={false}
            index={0}
          />
          <Message
            content={t(`dataDriven.example.answer1`)}
            type={`robot`}
            sources={t(`dataDriven.example.answer1Source`)}
            loading={false}
            index={1}
          />
          <div className="hidden md:block">
            <Message
              content={t(`dataDriven.example.question2`)}
              type={`userMessage`}
              sources={``}
              loading={false}
              index={1}
            />
            <Message
              content={t(`dataDriven.example.answer2`)}
              type={`robot`}
              sources={t(`dataDriven.example.answer2Source`)}
              loading={false}
              index={1}
            />
          </div>
        </div>
      ),
    },
    {
      title: t(`multiWorkspace.title`),
      description: t(`multiWorkspace.description`),
      image: (
        <Image src={locale === `en` ? workspacesEn : workspacesPt} alt="" />
      ),
    },
    {
      title: t(`userManagement.title`),
      description: t(`userManagement.description`),
      icon: <User size={iconSize} />,
      image: (
        <Image
          src={locale === `en` ? orgMembersEn : orgMembersPt}
          alt=""
          className="rounded-xl overflow-hidden"
        />
      ),
    },
    {
      title: t(`dataIntegration.title`),
      description: t(`dataIntegration.description`),
      icon: <Funnel size={iconSize} />,
      image: <Image src={platforms} alt="" />,
    },
  ],
};

const LandingPage = async ({
  params: { locale },
}: {
  params: {
    locale: `en` | `pt`;
  };
}) => {
  const t = await getI18n();
  const featTranslator = await getScopedI18n(`landingPage.features`);
  return (
    <div className=" text-foreground">
      <Navbar />
      <section
        style={{
          background: `radial-gradient(circle at center, var(--background-accent),  var(--background) 100%)`,
        }}
        className=" relative border-b border-solid border-border px-8 sm:h-screen items-center justify-center flex flex-col min-h-[750px]   py-20 text-center"
      >
        <div className="flex flex-1" />
        <div className="flex flex-col justify-center gap-4 md:gap-8 flex-1">
          <h1
            className="xl:text-8xl/tight max-w-5xl sm:text-6xl text-5xl/tight font-medium from-primary to-white bg-clip-text text-transparent"
            style={{
              backgroundImage: `radial-gradient(circle at 60%, rgb(255, 255, 255) 15%, rgba(255, 255, 255, 0.38))`,
            }}
          >
            {t(`landingPage.headerTitle`)}
          </h1>
          <p className="text-xl md:text-2xl text-foreground opacity-90 leading-relaxed mx-auto max-w-3xl">
            {t(`landingPage.headerDescription`)}
          </p>
          <div className="flex gap-2 mt-2 items-center justify-center">
            <Link target="_blank" href={whatsappLink}>
              <Button className="bg-secondary flex gap-2">
                <WhatsappLogo
                  className="text-foreground"
                  width={24}
                  fill="#fff"
                  height={24}
                />
                {t(`landingPage.contactUs`)}
              </Button>
            </Link>
            <AuthProtectedBtn fallback={t(`landingPage.tryForFree`)}>
              <Link href={`/chat`}>
                <Button size={`lg`} variant="outline">
                  {t(`landingPage.tryForFree`)}
                </Button>
              </Link>
            </AuthProtectedBtn>
          </div>
        </div>
        <div className="flex flex-1 w-full items-center static  justify-center ">
          <CaretDown
            className="text-foreground mt-16 flex animate-bounce"
            width={32}
            height={32}
          />
        </div>
      </section>
      <div>
        <main className="xl:max-w-7xl mx-auto   to-background">
          <section id="features" className="px-8 py-20">
            <div className="flex flex-col gap-16 md:gap-8">
              {landingPageContent
                .features(featTranslator, locale)
                .map((feature, index) => (
                  <AnimatedComponent
                    threshold={0.5}
                    key={feature.title}
                    animationClass="animate-in fade-in opacity-100 ease-in"
                    className="opacity-0 duration-10000"
                  >
                    <LandingPageFeature index={index} feature={feature} />
                  </AnimatedComponent>
                ))}
            </div>
            <h2 className="md:text-7xl mt-8 md:mt-16 text-4xl !leading-tight font-bold mb-4 text-center">
              {t(`landingPage.useCasesTitle`)}
            </h2>
            <SectionFeatures
              items={useCases.map((key) => ({
                title: t(`landingPage.useCases.${key}.title`),
                description: t(`landingPage.useCases.${key}.description`),
              }))}
            />
          </section>
        </main>
        <h2 className="md:text-7xl mt-8 md:mt-16 text-4xl !leading-tight font-bold mb-4 text-center max-w-5xl mx-auto">
          {t(`pricingTitle`)}
        </h2>
        <div className="xl:pb-16 md:pb-10 pb-8">
          <section id="pricing">
            <AuthProtectedPricingPage />
          </section>
        </div>

        <section className="px-8 py-20 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl  font-bold mb-4">
              {t(`landingPage.features.getStartedTitle`)}
            </h2>

            <Link target="_blank" href={calendlyLink}>
              <Button className="px-8 py-3 bg-foreground border border-border text-black hover:bg-background hover:text-foreground transition-all font-semibold rounded-lg">
                {t(`landingPage.features.bookMeeting`)}
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <footer className="px-8 py-6 text-center">
        <p className="text-sm">{t(`landingPage.features.footerText`)}</p>
      </footer>
    </div>
  );

  function LandingPageFeature({
    index,
    feature,
  }: {
    index: number;
    feature:
      | {
          title: string;
          description: string;
          icon: JSX.Element;
          image: JSX.Element;
        }
      | {
          title: string;
          description: string;
          image: JSX.Element;
          icon?: undefined;
        };
  }) {
    return (
      <div
        className={`flex ${
          index % 2 !== 0 ? `md:flex-row-reverse` : `md:flex-row`
        } flex-col items-center md:min-h-[750px] flex-1 gap-8`}
      >
        <div className={`flex flex-col md:flex-1 gap-4`}>
          <div className="md:text-7xl text-2xl font-bold">{feature.title}</div>
          <div className="md:text-2xl text-xl">{feature.description}</div>
        </div>
        <div className="flex flex-1">{feature.image}</div>
      </div>
    );
  }
};
export default LandingPage;

type Item = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const SectionFeatures = ({ items }: { items: Item[] }) => (
  <div className="relative flex flex-col justify-center py-6 sm:py-12">
    <div className="columns-1 md:columns-2 gap-4 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
      {items.map((feature, index) => (
        <AnimatedComponent
          threshold={0.9}
          key={feature.title}
          animationClass="animate-in fade-in opacity-100 ease-in"
          className="opacity-0 duration-10000"
        >
          <div className="break-inside-avoid flex flex-col gap-4 cursor-pointer  transition-all p-4 md:p-10 mb-6 bg-gradient-to-br from-surface-gradient-from to-surface-gradient-to rounded-xl">
            <div className="flex flex-col gap-1 items-center">
              {feature.icon}
              <h1 className="md:text-4xl text-2xl font-bold text-center ">
                {feature.title}
              </h1>
            </div>
            <p className="text-xl opacity-75 text-center">
              {feature.description}
            </p>
          </div>
        </AnimatedComponent>
      ))}
    </div>
  </div>
);
