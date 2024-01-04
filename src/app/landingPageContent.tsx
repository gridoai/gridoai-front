"use client";
import { Brain, Funnel, User, Users } from "@phosphor-icons/react/dist/ssr";

export const landingPageContent = {
  navTitle: `GridoAI`,
  headerTitle: (
    <>
      Talk with your data,
      <br /> Wherever it is.
    </>
  ),
  headerDescription: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
  features: [
    {
      title: `Data-Driven Answers`,
      description: `GridoAI leverages your data to provide accurate, insightful responses. No more guesswork, just data-backed answers`,
      icon: <Brain size={32} />,
    },
    {
      title: `Multiple Workspace Support`,
      description: `Different projects require different resources. GridoAI supports multiple workspaces with its unique set of documents, ensuring organized and efficient data management`,
      icon: <Users size={32} />,
    },
    {
      title: `User Management`,
      description: `Add users to your organization and manage their permissions seamlessly`,
      icon: <User size={32} />,
    },
    {
      title: `Robust data integration`,
      description: `Upload files, connect with popular providers like Google Drive, or integrate with your own custom data sources`,
      icon: <Funnel size={32} />,
    },
  ],
  getStartedTitle: `For demos and pricing, contact us today`,
  getStartedDescription: ``,
  footerText: `© ${new Date().getFullYear()} GridoAI. All rights reserved.`,
  contactUs: `Contact us`,
};
