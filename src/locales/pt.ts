// locales/pt.ts
export default {
  landingPage: {
    headerTitle: `Sua IA treinada com seus documentos`,
    contactUs: `Contate-nos`,
    tryForFree: `Converse grátis!`,
    navTitle: `GridoAI`,
    chatNow: `Converse agora`,
    navSubtitle: `Chatbot AI`,
    headerDescription: `GridoAI é um poderoso chatbot que utiliza seus dados para fornecer respostas precisas e contextualmente relevantes`,
    useCasesTitle: `Uma plataforma, infinitas possibilidades`,
    features: {
      dataDriven: {
        title: `Respostas baseadas em dados`,
        description: `GridoAI utiliza seus dados para fornecer respostas precisas e reveladoras. Não mais suposições, apenas respostas respaldadas por dados`,
        example: {
          question1: `Quais foram os itens de ação de nossa última reunião de equipe?`,
          answer1: `Os itens de ação de nossa última reunião de equipe foram: 1) Ana vai finalizar a proposta de orçamento, 2) João vai agendar uma reunião de acompanhamento com o cliente, e 3) Maria vai atualizar o cronograma do projeto.`,
          answer1Source: `Ata_de_Reunião_de_Equipe.pptx`,
          question2: `Quais são as principais atualizações esperadas no cronograma do projeto que Maria precisa fazer?`,
          answer2: `Maria precisa atualizar o cronograma do projeto para refletir a nova data de lançamento do produto e o cronograma revisado da campanha de marketing`,
          answer2Source: `Cronograma_do_Projeto.xlsx`,
        },
      },
      multiWorkspace: {
        title: `Múltiplos espaços de trabalho`,
        description: `GridoAI suporta múltiplos espaços de trabalho, cada um com seu próprio conjunto de documentos. Isso facilita o gerenciamento de projetos e equipes`,
      },
      userManagement: {
        title: `Gerenciamento de usuários`,
        description: `Você pode adicionar usuários aos espaços de trabalho e gerenciar suas permissões como administrador ou membro. Isso garante que todos tenham o acesso de que precisam sem comprometer a segurança`,
      },
      dataIntegration: {
        title: `Integração robusta de dados`,
        description: `Carregue arquivos, conecte-se com provedores populares como o Google Drive ou integre com suas próprias fontes de dados personalizadas`,
      },
      getStartedTitle: `Para demos e preços, entre em contato conosco hoje`,

      footerText: `© ${new Date().getFullYear()} GridoAI. Todos os direitos reservados.`,
      bookMeeting: `Agendar reunião`,
    },
    useCases: {
      internalDataOracle: {
        title: `Oráculo de Dados Internos`,
        description: `Analise dados interdepartamentais para respostas esclarecedoras, auxiliando na tomada de decisões e no planejamento estratégico.`,
      },
      softwareDevelopment: {
        title: `Desenvolvimento de Software`,
        description: `Obtenha respostas precisas sobre funções, algoritmos e práticas de codificação utilizando repositórios de código e documentação.`,
      },
      legalDocumentReview: {
        title: `Revisão de Documentos Legais`,
        description: `Poupe tempo na revisão manual carregando documentos e contratos jurídicos para encontrar cláusulas ou termos específicos.`,
      },
      businessAnalysis: {
        title: `Análise de Negócios`,
        description: `Obtenha insights e explicações sobre métricas ou tendências de negócios carregando relatórios e dados da empresa.`,
      },
      projectManagement: {
        title: `Gerenciamento de Projetos`,
        description: `Gerencie projetos de forma eficaz carregando documentos de planejamento, cronogramas e atribuições de equipe para respostas precisas sobre marcos, prazos ou responsabilidades.`,
      },
      educationalResearch: {
        title: `Pesquisa Educacional`,
        description: `Utilize materiais acadêmicos como artigos, livros e artigos de pesquisa para fazer perguntas sobre tópicos específicos, teorias ou eventos históricos.`,
      },
    },
  },
  createDocument: {
    nameRequired: `Nome é obrigatório`,
    contentRequired: `Conteúdo é obrigatório`,
    title: `Criar documento`,
    saveButton: `Salvar`,
  },
  planLimitErrorMessage: {
    questions: `Você atingiu o número máximo de perguntas`,

    documents: `Você atingiu o número máximo de documentos`,
    description: `Contate-nos para continuar usando`,
  },
  name: `Nome`,
  content: `Conteúdo`,
  source: `Fonte`,
  documents: {
    create: `Criar`,
    refresh: `Atualizar`,
    actions: `Ações`,
    pagination: `Página {current} de {count}`,
    paginationShowing: `Mostrar {size}`,
    errorFetching: `Houve um erro ao buscar os documentos`,
    title: `Documentos`,
    errorDeleting: `Houve um erro ao excluir o documento`,
    manualCreation: `Criação manual`,
    googleDrive: `Google Drive`,
    upload: `Upload`,
  },
  upload: {
    dragNDrop: `Arraste e solte alguns arquivos aqui, ou clique para selecionar arquivos`,
    sizeLimit: `{maxSize}MB Máx`,
    error: `Houve um erro ao carregar o arquivo`,
    success: `Arquivo carregado com sucesso`,
    justDrop: `Solte os arquivos aqui... `,
  },
  tryLater: `Por favor, tente novamente mais tarde`,
  upgradeNow: `Faça upgrade agora`,
  chat: {
    firstMessage: `Oi! Como posso ajudar?`,
    errorMsg: `Ops! Parece que houve um erro. Por favor, tente novamente`,
    inputPlaceholder: `Digite sua pergunta...`,
  },
  freePlanCard: {
    title: `Plano Gratuito`,
    questionsToday: `perguntas feitas hoje`,
    processedDocuments: `documentos processados`,
  },
} as const;
