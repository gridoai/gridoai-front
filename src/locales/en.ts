// locales/en.ts
export default {
  gaiaLandingPage: {
    hero: {
      title: `Gaia: Your AI Virtual Assistant on WhatsApp`,
      description: `Discover Gaia, a unique blend of personal assistant and virtual friend on WhatsApp. Engage in intelligent conversations, manage your life, and explore innovative solutions with just a message.`,
      callToAction: `Add to WhatsApp`,
      secondaryCallToAction: `Learn More`,
      demoImgAlt: `Gaia, the AI Assistant`,
    },
    features: {
      sectionTitle: `Explore Gaia's Capabilities`,
      sectionDescription: `Gaia, powered by GPT-3.5, offers a range of features to simplify and enrich your daily life through WhatsApp.`,
      featureList: [
        {
          title: `Intelligent and Dynamic Conversations`,
          description: `Engage with Gaia in natural, human-like conversations on a wide array of topics for both practical assistance and meaningful interaction.`,
        },
        {
          title: `Multimedia Analysis`,
          description: `Send audios and photos to Gaia for transcription, image descriptions, and insightful content analysis.`,
        },
        {
          title: `Group Presence`,
          description: `Integrate Gaia into your WhatsApp groups for active participation in discussions, games, and social activities.`,
        },
        {
          title: `Advanced Content Analysis`,
          description: `Forward documents, emails, or voice messages to Gaia for concise summaries, sentiment analysis, and suggested responses.`,
        },
        {
          title: `Complementary Web Platform`,
          description: `Access Gaia on a user-friendly web platform for enhanced management of your conversations and documents.`,
        },
      ],
    },
    cta: {
      title: `Enhance Your Daily Life with Gaia`,
      description: `Experience the convenience of a virtual friend and personal assistant in one. Add Gaia to your WhatsApp today.`,
      buttonText: `Start with Gaia`,
    },
    layout: {
      seoTitle: `Gaia - AI Virtual Assistant for WhatsApp`,
      seoDescription: `Gaia combines the functionality of a personal assistant with the companionship of a virtual friend, all accessible via WhatsApp.`,
      footerText: `Connect with Gaia - Your AI Companion`,
      navbarText: `Gaia on WhatsApp`,
    },
  },
  preview: {
    title: `Grido AI | AI Chatbot trained on your documents`,
    description: `GridoAI is a powerful chatbot that uses your data to provide precise and contextually relevant answers`,
  },

  landingPage: {
    headerTitle: `AI Chatbot trained on your documents`,
    contactUs: `Contact us`,
    tryForFree: `Try for free`,
    navTitle: `GridoAI`,
    chatNow: `Chat now`,
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
    useCases: {
      internalDataOracle: {
        title: `Internal Data Oracle`,
        description: `Analyze cross-departmental data for insightful answers, aiding decision-making and strategic planning.`,
      },
      softwareDevelopment: {
        title: `Software Development`,
        description: `Get accurate answers about functions, algorithms, and coding practices using code repositories and documentation.`,
      },
      legalDocumentReview: {
        title: `Legal Document Review`,
        description: `Save time on manual review by uploading legal documents and contracts to find specific clauses or terms.`,
      },
      businessAnalysis: {
        title: `Business Analysis`,
        description: `Gain insights and explanations about business metrics or trends by uploading company reports and data.`,
      },
      projectManagement: {
        title: `Project Management`,
        description: `Manage projects effectively by uploading planning documents, timelines, and team assignments for accurate answers about milestones, deadlines, or responsibilities.`,
      },
      educationalResearch: {
        title: `Educational Research`,
        description: `Utilize academic materials like articles, books, and research papers to ask questions about specific topics, theories, or historical events.`,
      },
    },
    bePartner: `Be an affiliate`,
    bePartnerMessage: `I would like to know more about the affiliate program`,
  },
  createDocument: {
    nameRequired: `Name is required`,
    contentRequired: `Content is required`,
    title: `Create document`,
    saveButton: `Save`,
  },
  planLimitErrorMessage: {
    questions: `You have reached the maximum number of questions`,

    documents: `You have reached the maximum number of documents`,
    description: `Contact us to continue using`,
  },
  name: `Name`,
  content: `Content`,
  source: `Source`,
  documents: {
    create: `Create`,
    refresh: `Refresh`,
    actions: `Actions`,
    pagination: `Page {current} of {count}`,
    paginationShowing: `Show {size}`,
    errorFetching: `There was an error fetching the documents`,
    title: `Documents`,
    errorDeleting: `There was an error deleting the document`,
    manualCreation: `Manual creation`,
    googleDrive: `Google Drive`,
    whatsApp: `WhatsApp`,
    upload: `Upload`,
  },
  upload: {
    dragNDrop: `Drag 'n' drop some files here, or click to select files`,
    sizeLimit: `{maxSize}MB Max`,
    error: `There was an error uploading the files`,
    success: `Files uploaded successfully`,
    justDrop: `Drop the files here... `,
    started: `Upload started, you will be notified when it's done`,
  },
  tryLater: `Please try again later`,
  upgradeNow: `Upgrade now`,
  upgradeTo: `Upgrade to {plan}`,
  chat: {
    firstMessage: `Hi there! How can I help?`,
    errorMsg: `Oops! There seems to be an error. Please try again`,
    inputPlaceholder: `Type your question...`,
  },
  freePlanCard: {
    title: `{plan} plan`,
    questions: `questions`,
    processedDocuments: `processed documents`,
    membersInvited: `members invited`,
  },
  plans: {
    free: `Free`,
    starter: `Starter`,
    pro: `Pro`,
    individual: `Individual`,
  },

  managePlan: `Manage plan`,
  billing: `Billing`,
  manageSubscription: `Manage subscription`,
  pricingTitle: `We offer a plan that helps anyone get started`,
  settings: `Settings`,
  gdrive: {
    connectToGoogleDrive: `Connect to Google Drive`,
    importFromDrive: `Import from Drive`,
    successfullyAuthenticated: `Successfully authenticated with Google Drive`,
    failedToAuthenticate: `Failed to authenticate with Google Drive`,
    importingFiles: `Importing files from Google Drive, please wait`,
    successfullyImported: `Successfully imported from Google Drive`,
    failedToImport: `Failed to import from Google Drive`,
    userCancelled: `User clicked cancel/close button`,
  },
} as const;
