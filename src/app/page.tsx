import Link from "next/link";
import { Button } from "../components/ui/button";
import Image from "next/image";
import bg from "../../public/bg_purple.png";
import { Brain, Funnel, User, Users } from "../components/icon";
import { Navbar } from "./Navbar";
import AnimatedComponent from "../components/animatedWrapper";
import workspaces from "../../public/workspaces.png";
import orgMembers from "../../public/orgMembers.png";
import platforms from "../../public/platforms.png";
import { AuthProtectedBtn } from "./AuthProtectedBtn";
import { Message } from "../components/Chat/Message";
import { calendlyLink } from "./calendlyLink";
const useCases = [
  {
    title: `Internal Data Oracle`,
    description: `Analyze cross-departmental data for insightful answers, aiding decision-making and strategic planning.`,
  },
  {
    title: `Software Development`,
    description: `Get accurate answers about functions, algorithms, and coding practices using code repositories and documentation.`,
  },
  {
    title: `Legal Document Review`,
    description: `Save time on manual review by uploading legal documents and contracts to find specific clauses or terms.`,
  },
  {
    title: `Business Analysis`,
    description: `Gain insights and explanations about business metrics or trends by uploading company reports and data.`,
  },
  {
    title: `Project Management`,
    description: `Manage projects effectively by uploading planning documents, timelines, and team assignments for accurate answers about milestones, deadlines, or responsibilities.`,
  },
  {
    title: `Educational Research`,
    description: `Utilize academic materials like articles, books, and research papers to ask questions about specific topics, theories, or historical events.`,
  },
];

const iconSize = 42;
export const landingPageContent = {
  navTitle: `GridoAI`,
  headerTitle: (
    <>
      Talk with{` `}
      <span className="bg-clip-text from-primary to-secondary text-transparent bg-gradient-to-r ">
        {` `}
        your
      </span>
      {` `}
      data,
      <br /> wherever it is.
    </>
  ),
  headerDescription: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
  features: [
    {
      title: `Data-driven answers`,
      description: `GridoAI leverages your data to provide accurate, insightful responses. No more guesswork, just data-backed answers`,
      icon: <Brain size={iconSize} />,
      image: (
        <div>
          <Message
            content={`What were the action items from our last team meeting?`}
            type={`userMessage`}
            sources={``}
            loading={false}
            index={0}
          />
          <Message
            content={`The action items from our last team meeting were: 1) Jane to finalize the budget proposal, 2) Mike to schedule a follow-up meeting with the client, and 3) Sarah to update the project timeline.`}
            type={`robot`}
            sources={`Team_Meeting_Minutes.pptx`}
            loading={false}
            index={1}
          />
          <div className="hidden md:block">
            <Message
              content={`What are the key updates expected in the project timeline that Sarah needs to make?`}
              type={`userMessage`}
              sources={``}
              loading={false}
              index={1}
            />
            <Message
              content={`Sarah needs to update the project timeline to reflect the new product launch date and the revised marketing campaign schedule`}
              type={`robot`}
              sources={`Project_Timeline.docx`}
              loading={false}
              index={1}
            />
          </div>
        </div>
      ),
    },
    {
      title: `Multiple workspaces`,
      description: `GridoAI supports multiple workspaces, each with its own set of documents. This makes it easy to manage projects and teams`,
      image: <Image src={workspaces} alt="" />,
    },
    {
      title: `User management`,
      description: `You can add users to workspaces and manage their permissions as either an admin or a member. This ensures that everyone has the access they need without compromising security`,
      icon: <User size={iconSize} />,
      image: (
        <Image src={orgMembers} alt="" className="rounded-xl overflow-hidden" />
      ),
    },
    {
      title: `Robust data integration`,
      description: `Upload files, connect with popular providers like Google Drive, or integrate with your own custom data sources`,
      icon: <Funnel size={iconSize} />,
      image: <Image src={platforms} alt="" />,
    },
  ],
  getStartedTitle: `For demos and pricing, contact us today`,
  getStartedDescription: ``,
  footerText: `© ${new Date().getFullYear()} GridoAI. All rights reserved.`,
  contactUs: `Contact us`,
};

const LandingPage = () => {
  return (
    <div className=" text-foreground">
      <Image src={bg} className="w-screen absolute h-screen -z-10" alt="" />
      <Navbar />
      <section
        style={{
          background: `radial-gradient(circle at center, var(--background-accent),  var(--background) 100%)`,
        }}
        className="border-b border-solid border-border px-8 sm:h-screen items-center justify-center flex flex-col gap-4 min-h-[750px] md:gap-8 py-20 text-center"
      >
        <h1
          className="xl:text-8xl/tight sm:text-6xl text-5xl/tight font-medium from-primary to-white bg-clip-text text-transparent"
          style={{
            backgroundImage: `radial-gradient(circle at 60%, rgb(255, 255, 255) 15%, rgba(255, 255, 255, 0.38))`,
          }}
        >
          {landingPageContent.headerTitle}
        </h1>
        <p className="text-xl mx:text-2xl  leading-relaxed mx-auto max-w-3xl">
          {landingPageContent.headerDescription}
        </p>
        <div className="flex gap-2 mt-2 items-center">
          <Link target="_blank" href="https://calendly.com/gridoai/30min">
            <Button className="bg-secondary ">Contact us</Button>
          </Link>
          <AuthProtectedBtn fallback="Try for free">
            <Link href={`/chat`}>
              <Button size={`lg`} variant="outline">
                Try for free
              </Button>
            </Link>
          </AuthProtectedBtn>
        </div>
      </section>
      <div>
        <main className="xl:max-w-7xl mx-auto   to-background">
          <section className="px-8 py-20">
            <div className="flex flex-col gap-16 md:gap-8">
              {landingPageContent.features.map((feature, index) => (
                <AnimatedComponent
                  threshold={0.7}
                  key={index}
                  animationClass="animate-in fade-in opacity-100 ease-in"
                  className="opacity-0 duration-10000"
                >
                  <div
                    className={`flex ${
                      index % 2 !== 0 ? `md:flex-row-reverse` : `md:flex-row`
                    } flex-col items-center md:min-h-[750px] flex-1 gap-8`}
                  >
                    <div className={`flex flex-col md:flex-1 gap-4`}>
                      <div className="md:text-7xl text-2xl font-bold">
                        {feature.title}
                      </div>
                      <div className="md:text-2xl text-xl">
                        {feature.description}
                      </div>
                    </div>
                    <div className="flex flex-1">{feature.image}</div>
                  </div>
                </AnimatedComponent>
              ))}
            </div>
            <h2 className="md:text-7xl mt-8 md:mt-16 text-4xl !leading-tight font-bold mb-4 text-center">
              One platform, endless possibilities
            </h2>
            <SectionFeatures items={useCases} />
          </section>
        </main>
        <section className="px-8 py-20 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl  font-bold mb-4">
              {landingPageContent.getStartedTitle}
            </h2>
            <p className="text-xl mb-8">
              {landingPageContent.getStartedDescription}
            </p>
            <Link target="_blank" href={calendlyLink}>
              <Button className="px-8 py-3 bg-foreground border border-border text-black hover:bg-background hover:text-foreground transition-all font-semibold rounded-lg">
                Book meeting
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <footer className="px-8 py-6 text-center">
        <p className="text-sm">{landingPageContent.footerText}</p>
      </footer>
    </div>
  );
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
          key={index}
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

export const runtime = `nodejs`;
