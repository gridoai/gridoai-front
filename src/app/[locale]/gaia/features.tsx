import { getScopedI18n } from "@/locales/server";
import {
  ChatCentered,
  File,
  FileAudio,
  Globe,
  MagnifyingGlass,
  Users,
} from "@phosphor-icons/react/dist/ssr";

export const Features = async () => {
  const t = await getScopedI18n(`gaiaLandingPage.features`);
  const features = [
    {
      title: t(`featureList.0.title`),
      description: t(`featureList.0.description`),
      icon: <ChatCentered weight="fill" />,
    },
    {
      title: t(`featureList.1.title`),
      description: t(`featureList.2.description`),
      icon: <FileAudio weight="fill" />,
    },
    {
      title: t(`featureList.2.title`),
      description: t(`featureList.2.description`),
      icon: <Users weight="fill" />,
    },
    {
      title: t(`featureList.3.title`),
      description: t(`featureList.3.description`),
      icon: <MagnifyingGlass weight="fill" />,
    },
    {
      title: t(`featureList.4.title`),
      description: t(`featureList.4.description`),
      icon: <Globe weight="fill" />,
    },
  ];

  return (
    <>
      <div className="mt-16 md:mt-0">
        <h2 className="text-4xl text-slate-900 lg:text-5xl font-bold lg:tracking-tight">
          {t(`sectionTitle`)}
        </h2>
        <p className="text-lg mt-4 text-slate-600">{t(`sectionDescription`)}</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
        {features.map((item) => (
          <div key={item.title} className="flex gap-4 items-start">
            <div className="mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold  text-slate-900 text-lg">
                {item.title}
              </h3>
              <p className="text-slate-500 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
