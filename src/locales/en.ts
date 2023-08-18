// locales/en.ts
export default {
  landingPage: {
    contactUs: `Contact us`,
    tryForFree: `Try for free`,
    navTitle: `GridoAI`,
    navSubtitle: `AI chatbot`,
    headerDescription: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
    useCasesTitle: `One platform, endless possibilities`,
    features: {
      dataDriven: {
        title: `Data-driven answers`,
        description: `GridoAI leverages your data to provide accurate, insightful responses. No more guesswork, just data-backed answers`,
        example: {
          question1: `What were the action items from our last team meeting?`,
          answer1: `The action items from our last team meeting were: 1) Jane to finalize the budget proposal, 2) Mike to schedule a follow-up meeting with the client, and 3) Sarah to update the project timeline.`,
          answer1Source: `Team_Meeting_Minutes.pptx`,
          question2: `What are the key updates expected in the project timeline that Sarah needs to make?`,
          answer2: `Sarah needs to update the project timeline to reflect the new product launch date and the revised marketing campaign schedule`,
          answer2Source: `Project_Timeline.xlsx`,
        },
      },
      multiWorkspace: {
        title: `Multiple workspaces`,
        description: `GridoAI supports multiple workspaces, each with its own set of documents. This makes it easy to manage projects and teams`,
      },
      userManagement: {
        title: `User management`,
        description: `You can add users to workspaces and manage their permissions as either an admin or a member. This ensures that everyone has the access they need without compromising security`,
      },
      dataIntegration: {
        title: `Robust data integration`,
        description: `Upload files, connect with popular providers like Google Drive, or integrate with your own custom data sources`,
      },
      getStartedTitle: `For demos and pricing, contact us today`,

      footerText: `© ${new Date().getFullYear()} GridoAI. All rights reserved.`,
      bookMeeting: `Book meeting`,
    },
    useCases: [
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
    ],
  },
} as const;
