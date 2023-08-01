import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";
import Image from "next/image";
import bg from "../../public/bg_purple.png";
import { Brain, Funnel, User, Users } from "../components/icon";

const useCases = [

  {
    title: `Internal Data Oracle`,
    image: `An employee using GridoAI to access company data`,
    description: `GridoAI serves as an 'Internal Data Oracle' for corporations, offering insightful answers by analyzing vast internal data across departments. Professionals can ask specific operational or strategic questions, and GridoAI will provide contextually accurate responses, aiding decision-making and strategic planning`,
  },
  {
    "title": `Software Development`,
    "description": `A software developer can upload code repositories and related documentation into GridoAI. They can then ask the chatbot questions about specific functions, algorithms, or coding practices, getting accurate answers supported by the uploaded data.`
  },
  {
    "title": `Legal Document Review`,
    "description": `A lawyer can upload a series of legal documents and contracts into GridoAI. They can then ask the chatbot to find specific clauses or terms within the documents, saving time on manually reviewing each document and ensuring that nothing is missed.`
  },
  {
    "title": `Business Analysis`,
    "description": `A business analyst can upload various company reports and data into GridoAI. They can then ask the chatbot to provide insights or explanations about specific business metrics or trends, backed by the uploaded documents.`
  },
  {
    "title": `Project Management`,
    "description": `A project manager can upload project planning documents, timelines, and team assignments into GridoAI. They can then ask the chatbot questions about project milestones, deadlines, or responsibilities, getting accurate answers supported by the uploaded data.`
  },
  {
    "title": `Educational Research`,
    "description": `Academics and students can upload a series of articles, books, and research papers into GridoAI. They can then use the chatbot to ask questions about specific topics, theories, or historical events, getting answers backed by the uploaded documents.`
  },
];
const iconSize = 42
const landingPageContent = {
  navTitle: `GridoAI`,
  headerTitle: (
    <>
      Talk with your data,
      <br /> wherever it is.
    </>
  ),
  headerDescription: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
  features: [
    {
      title: `Data-Driven Answers`,
      description: `GridoAI leverages your data to provide accurate, insightful responses. No more guesswork, just data-backed answers`,
      icon: <Brain size={iconSize} />
    },
    {
      title: `Multiple Workspace Support`,
      description: `Different projects require different resources. GridoAI supports multiple workspaces with its unique set of documents, ensuring organized and efficient data management`,
      icon: <Users size={iconSize} />
    },
    {
      title: `User Management`,
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
      // style={{
      //   background: `radial-gradient(circle, var(--background-accent), var(--background))`,
      // }}
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
            <Button className="bg-primary ">
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
export const runtime = `nodejs`;

const SectionColumn = ({ children }: {
  children: React.ReactNode
}) => {
  return <div className="flex flex-col gap-10">{children}</div>;
}

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
    <div className="columns-1 md:columns-2 gap-10 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
      {items.map((feature, index) => (
        <div key={index} className="break-inside-avoid flex flex-col gap-2 cursor-pointer hover:shadow-2xl hover:bg-[#242954] hover:from-[#242954] hover:to-[#282F70] hover:bg-gradient-to-br hover:drop-shadow hover:shadow-[#242954] transition-all p-4 md:p-6 mb-6 bg-card rounded-lg">
          <div className="flex gap-1 items-center">
            {feature.icon}
            <h1 className="md:text-3xl text-2xl font-bold">{feature.title}</h1>
          </div>
          <p className="text-xl">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

function SectionFeature({ feature }: { feature: { title: string; description: string; }; }) {
  return <div className="flex flex-col md:flex-row items-center justify-between gap-8">

    <div className="h-60  flex flex-col">
      <h3 className="text-4xl font-bold mb-4">{feature.title}</h3>
      <p className="text-lg">{feature.description}</p>
    </div>
    <div className="aspect-square h-96 bg-card rounded-lg">

    </div>
  </div>
}

function Navbar() {
  const user = auth();

  return (
    <nav className=" fixed w-full flex items-center backdrop-blur-3xl bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
      <div className="text-2xl font-bold flex justify-between">
        {landingPageContent.navTitle}
      </div>
      {user.sessionId ? (
        <Link href="/chat">
          <Button className="transparent" variant="outline">
            Go to chat
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/sign-in">
            <Button variant="outline" className="mr-2 transparent">
              Login
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
}
