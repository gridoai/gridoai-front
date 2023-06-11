import Link from "next/link";

const landingPageContent = {
  navTitle: "GridoAI",
  headerTitle: "Revolutionize Your Information Management with GridoAI",
  headerDescription:
    "GridoAI is a powerful plugin that uses artificial intelligence to transform the way you interact with information. Whether you're navigating policy documents, searching for specific building codes, or exploring a vast library catalogue, GridoAI makes it effortless.",
  features: [
    {
      title: "Intelligent Search",
      description:
        "GridoAI uses AI and a vector space model to deliver precise and contextually relevant search results. Whether you're a hospital administrator, a construction project manager, or a university librarian, finding the information you need has never been easier.",
    },
    {
      title: "Smart Information Interaction",
      description:
        "Interact conversationally with your information, as though speaking with an oracle or genie. GridoAI understands your queries and provides intelligent responses, making it a valuable tool for project managers, software developers, and compliance officers alike.",
    },
    {
      title: "Graph-Based Search",
      description:
        "Leverage the power of a graph database with GridoAI. Explore relationships between documents, uncover hidden insights, and navigate your information landscape with ease and precision.",
    },
  ],
  getStartedTitle: "Experience the Power of GridoAI",
  getStartedDescription:
    "Transform the way you manage information. Experience the efficiency, precision, and intelligence of GridoAI's interactive information management solution.",
  footerText: `© ${new Date().getFullYear()} GridoAI. All rights reserved.`,
};

const LandingPage = () => (
  <div className="bg-neutral-950 text-white">
    <nav className="flex items-center bg-[#141619] border-b border-[#30373d] justify-between px-8 py-6">
      <div className="text-2xl font-bold">{landingPageContent.navTitle}</div>
      {/* <button className="px-4 py-2 bg-[#141619] border border-[#30373d] rounded-lg">
          Get Started
        </button> */}
    </nav>
    <header className="px-8 h-screen items-center justify-center flex flex-col py-20 text-center">
      <h1 className="text-9xl/tight font-bold mb-4">
        {landingPageContent.headerTitle}
      </h1>
      <p className="text-xl leading-relaxed mx-auto max-w-3xl">
        {landingPageContent.headerDescription}
      </p>
      {/* <button className="px-8 py-3 mt-8 bg-white border border-[#30373d] text-black hover:bg-[#141619] hover:text-white transition-all font-semibold rounded-lg">
          Learn More
        </button> */}
    </header>
    <section className="px-8 py-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Key Features</h2>
        <p className="text-xl">
          GridoAI offers a range of powerful features to enhance your document
          management process:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {landingPageContent.features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-[#141619] border border-[#30373d] rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="px-8 py-20 bg-[#141619] border border-[#30373d]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          {landingPageContent.getStartedTitle}
        </h2>
        <p className="text-xl mb-8">
          {landingPageContent.getStartedDescription}
        </p>
        <Link href="mailto:partners@gridoai.com">
          <button className="px-8 py-3 bg-white border border-[#30373d] text-black hover:bg-[#141619] hover:text-white transition-all font-semibold rounded-lg">
            Contact us
          </button>
        </Link>
      </div>
    </section>
    <footer className="px-8 py-6 text-center">
      <p className="text-sm">{landingPageContent.footerText}</p>
    </footer>
  </div>
);

export default LandingPage;
