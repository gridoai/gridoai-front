import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";
import Image from "next/image";
import bg from "../../public/bg_purple.png";
const useCases = [
  {
    useCase: `Project Management`,
    image: `A project team collaborating using GridoAI`,
    description: `Streamline project management with GridoAI. Keep track of files, manage tasks, and enhance team collaboration.`,
  },
  {
    useCase: `Research`,
    image: `A researcher using GridoAI to sort through documents`,
    description: `Speed up research with GridoAI. Upload papers, analyze data, and find sources instantly.`,
  },
  {
    useCase: `Education`,
    image: `A teacher using GridoAI to manage materials`,
    description: `Revolutionize teaching with GridoAI. Manage syllabi, assignments, and share resources easily.`,
  },
  {
    useCase: `Business Operations`,
    image: `A team making decisions based on data from GridoAI`,
    description: `Optimize business operations with GridoAI. Track sales data, upload reports, and make informed decisions.`,
  },
  {
    useCase: `Content Creation`,
    image: `A content creator using GridoAI for organization`,
    description: `Boost content creation with GridoAI. Manage drafts, upload inspirations, and source references smoothly.`,
  },
  {
    useCase: `Internal Data Oracle`,
    image: `An employee using GridoAI to access company data`,
    description: `Transform data access with GridoAI. Manage internal databases, upload reports, and provide instant information access.`,
  },
];
const landingPageContent = {
  navTitle: `GridoAI`,
  headerTitle: (
    <>
      Talk with your data
      <br /> wherever it is
    </>
  ),
  headerDescription: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
  features: [
    {
      title: `Data-Driven Answers`,
      description: `GridoAI leverages your data to provide accurate, insightful responses. No more guesswork, just data-backed answers`,
    },
    {
      title: `Multiple Workspace Support`,
      description: `Different projects require different resources. GridoAI supports multiple workspaces with its unique set of documents, ensuring organized and efficient data management`,
    },
    {
      title: `User Management`,
      description: `Add users to your organization and manage their permissions seamlessly`,
    },
    {
      title: `Robust data integration`,
      description: `Upload files, connect with popular providers like Google Drive, or integrate with your own custom data sources`,
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
      <section className="px-8 sm:h-screen items-center justify-center flex flex-col py-20 text-center">
        <h1 className="xl:text-8xl/tight sm:text-6xl text-5xl/tight font-bold mb-4">
          {landingPageContent.headerTitle}
        </h1>
        <p className="text-2xl leading-relaxed mx-auto max-w-3xl">
          {landingPageContent.headerDescription}
        </p>
        <div className="flex gap-2 mt-2 items-center">
          <Link href="https://calendly.com/gridoai/30min">
            <Button className="bg-gradient-to-r from-primary to-secondary text-foreground transition-all ">
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
            <div className="flex flex-col gap-8">
              {landingPageContent.features.map((feature, index) => (
                <div key={index} className="h-60 items-center flex flex-col">
                  <h3 className="text-4xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <section className="px-8 py-20 border-y border-border">
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
function Navbar() {
  const user = auth();

  return (
    <nav className="fixed w-full flex items-center backdrop-blur-3xl bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
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
