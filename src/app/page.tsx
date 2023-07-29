import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";
import Image from "next/image";
import bg from "../../public/bg_purple.png";
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
      description: `We understand that different projects require different resources. GridoAI supports multiple workspaces, each with its unique set of documents, ensuring organized and efficient data management`,
    },
    {
      title: `User Management`,
      description: `Add users to your organization and manage their permissions seamlessly with GridoAI`,
    },
    {
      title: `Robust data integration`,
      description: `Upload files, connect with popular providers like Google Drive, or integrate with your own custom data sources`,
    },
  ],
  getStartedTitle: `Experience the Power of GridoAI`,
  getStartedDescription: `Transform the way you get information. Experience the efficiency, precision, and intelligence of GridoAI's interactive information solution.`,
  footerText: `© ${new Date().getFullYear()} GridoAI. All rights reserved.`,
  contactUs: `Contact us`,
};

const LandingPage = () => {
  const user = auth();
  return (
    <div className=" text-foreground">
      <Image src={bg} className="w-screen absolute h-screen -z-10" alt="" />
      <nav className="fixed w-full flex items-center backdrop-blur-3xl bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
        <div className="text-2xl font-bold flex justify-between">
          {landingPageContent.navTitle}
        </div>
        {user.sessionId ? (
          <Link href="/chat">
            <Button variant="outline">Go to chat</Button>
          </Link>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="outline" className="mr-2">
                Login
              </Button>
            </Link>
          </>
        )}
      </nav>
      <header className="px-8 sm:h-screen items-center justify-center flex flex-col py-20 text-center">
        <h1 className="xl:text-8xl/tight sm:text-6xl text-5xl/tight font-bold mb-4">
          {landingPageContent.headerTitle}
        </h1>
        <p className="text-2xl leading-relaxed mx-auto max-w-3xl">
          {landingPageContent.headerDescription}
        </p>
        {/* <Button className="px-8 py-3 mt-8 bg-foreground border border-neutral-2 text-black hover:bg-background hover:text-foreground transition-all font-semibold rounded-lg">
          Learn More
        </Button> */}
      </header>
      <main className="xl:max-w-6xl mx-auto">
        <section className="px-8 py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Key Features</h2>
            {/* <p className="text-xl">
              GridoAI offers a range of powerful features to enhance your
              document management process:
            </p> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {landingPageContent.features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-background border border-neutral-2 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <section className="px-8 py-20 bg-background border border-neutral-2">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            {landingPageContent.getStartedTitle}
          </h2>
          <p className="text-xl mb-8">
            {landingPageContent.getStartedDescription}
          </p>
          <Link href="mailto:partners@gridoai.com">
            <Button className="px-8 py-3 bg-foreground border border-neutral-2 text-black hover:bg-background hover:text-foreground transition-all font-semibold rounded-lg">
              Contact us
            </Button>
          </Link>
        </div>
      </section>
      <footer className="px-8 py-6 text-center">
        <p className="text-sm">{landingPageContent.footerText}</p>
      </footer>
    </div>
  );
};
export default LandingPage;
export const runtime = `nodejs`;
