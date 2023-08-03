import Link from "next/link";
import { Button } from "../components/ui/button";
import Image from "next/image";
import bg from "../../public/bg_purple.png";
import { Brain, Funnel, User, Users } from "../components/icon";
import { Navbar } from "./Navbar";

const useCases = [
  {
    "title": `Internal Data Oracle`,
    "description": `GridoAI analyzes vast internal data across departments to provide insightful answers for corporations, aiding decision-making and strategic planning.`
  },
  {
    "title": `Software Development`,
    "description": `Software developers can upload code repositories and documentation into GridoAI and get accurate answers about specific functions, algorithms, or coding practices.`
  },
  {
    "title": `Legal Document Review`,
    "description": `Lawyers can upload legal documents and contracts into GridoAI to find specific clauses or terms, saving time on manual review.`
  },
  {
    "title": `Business Analysis`,
    "description": `Business analysts can upload company reports and data into GridoAI to get insights or explanations about specific business metrics or trends.`
  },
  {
    "title": `Project Management`,
    "description": `Project managers can upload planning documents, timelines, and team assignments into GridoAI and get accurate answers about project milestones, deadlines, or responsibilities.`
  },
  {
    "title": `Educational Research`,
    "description": `Academics and students can upload articles, books, and research papers into GridoAI and use it to ask questions about specific topics, theories, or historical events.`
  }
];

const iconSize = 42
export const landingPageContent = {
  navTitle: `GridoAI`,
  headerTitle: (
    <>
      Talk with <span className="bg-clip-text from-primary to-secondary text-transparent bg-gradient-to-r "> your</span> data,
      <br /> wherever it is.
    </>
  ),
  headerDescription: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
  features: [
    {
      title: `Data-driven answers`,
      description: `GridoAI leverages your data to provide accurate, insightful responses. No more guesswork, just data-backed answers`,
      icon: <Brain size={iconSize} />
    },
    {
      title: `Multiple workspaces`,
      description: `Different projects require different resources. GridoAI supports multiple workspaces with its unique set of documents, ensuring organized and efficient data management`,
      icon: <Users size={iconSize} />
    },
    {
      title: `User management`,
      description: `Add users to your organization and manage their permissions seamlessly`,
      icon: <User size={iconSize} />
    },
    {
      title: `Robust data integration`,
      description: `Upload files, connect with popular providers like Google Drive, or integrate with your own custom data sources`,
      icon: <Funnel size={iconSize} />

    },
  ],
  getStartedTitle: `For demos and pricing, contact us today`,
  getStartedDescription: ``,
  footerText: `© ${new Date().getFullYear()} GridoAI. All rights reserved.`,
  contactUs: `Contact us`,
};

const LandingPage = () => {
  return (
    <div
      className=" text-foreground"
    >
      <Image src={bg} className="w-screen absolute h-screen -z-10" alt="" />
      <Navbar />
      <section
        style={{
          background: `radial-gradient(circle at center, var(--background-accent),  var(--background) 100%)`
        }}
        className="border-b border-solid border-border px-8 sm:h-screen items-center justify-center flex flex-col gap-2 min-h-[750px] md:gap-4 py-20 text-center">
        <h1 className="xl:text-8xl/tight sm:text-6xl text-5xl/tight font-medium from-primary to-white bg-clip-text text-transparent"
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
          <Link href="https://calendly.com/gridoai/30min">
            <Button className="bg-secondary ">
              Contact us
            </Button>
          </Link>

          <Link href="/chat">
            <Button size={`lg`} variant="outline">
              Try for free
            </Button>
          </Link>
        </div>
      </section>
      <div>
        <main className="xl:max-w-6xl mx-auto   to-background">
          <section className="px-8 py-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Key Features</h2>
            </div>
            <SectionFeatures items={landingPageContent.features} />
            <h2 className="text-5xl font-bold mb-4 text-center">One platform, endless possibilities</h2>
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
            <Link href="https://calendly.com/gridoai/30min">
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
}

const SectionFeatures = ({
  items
}: {
  items: Item[]
}) => (
  <div className="relative flex flex-col justify-center py-6 sm:py-12">
    <div className="columns-1 md:columns-2 gap-4 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
      {items.map((feature, index) => (
        <div key={index} className="break-inside-avoid flex flex-col gap-4 cursor-pointer  transition-all p-4 md:p-10 mb-6 bg-gradient-to-br from-surface-gradient-from to-surface-gradient-to rounded-xl">
          <div className="flex flex-col gap-1 items-center">
            {feature.icon}
            <h1 className="md:text-4xl text-2xl font-bold text-center ">{feature.title}</h1>
          </div>
          <p className="text-xl opacity-75">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const runtime = `nodejs`;
