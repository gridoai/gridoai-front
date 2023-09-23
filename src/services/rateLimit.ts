import { Plan, getPublicData } from "./auth";
type PlanLimits = {
  questionLimit: number;
  uploadLimit: number;
  membersLimit?: number;
};
const paidPlans = {
  starter: {
    questionLimit: 300,
    uploadLimit: 200,
    membersLimit: 10,
  },
  pro: {
    questionLimit: 4000,
    uploadLimit: 3000,
    membersLimit: 100,
  },
  enterprise: {
    questionLimit: Infinity,
    uploadLimit: Infinity,
    membersLimit: Infinity,
  },
  individual: {
    questionLimit: 150,
    uploadLimit: 100,
    membersLimit: 1,
  },
};

const paidPlansPromo = {
  starter: {
    questionLimit: Infinity,
    uploadLimit: Infinity,
    membersLimit: 3,
  },
  pro: {
    questionLimit: Infinity,
    uploadLimit: Infinity,
    membersLimit: 5,
  },
  enterprise: {
    questionLimit: Infinity,
    uploadLimit: Infinity,
    membersLimit: Infinity,
  },
  individual: {
    questionLimit: Infinity,
    uploadLimit: Infinity,
    membersLimit: 1,
  },
};

export const plans: Record<Plan, PlanLimits> = {
  free: {
    questionLimit: 30,
    uploadLimit: 5,
  },
  ...(process.env.NEXT_PUBLIC_PROMO === `true` || true
    ? paidPlansPromo
    : paidPlans),
};

const getCurrentPlanLimits = async () => {
  const currentPlan = (await getPublicData().catch(console.error))?.plan;
  return plans[currentPlan || `free`];
};

export const isFreePlan = async (fetchPublicData = getPublicData) => {
  const currentPlan = (await fetchPublicData().catch(console.error))?.plan;
  if (!currentPlan) return true;
  return currentPlan === `free` ? true : false;
};

export const getQuestionLimit = async () =>
  (await getCurrentPlanLimits()).questionLimit;

export const getUploadLimit = async () =>
  (await getCurrentPlanLimits()).uploadLimit;

export const triggerLocalStorageRefresh = () =>
  window.dispatchEvent(new Event(`local-storage`));

export const setDocumentCount = (count: number) => {
  localStorage.setItem(DOC_COUNTER_KEY, `${count}`);
  triggerLocalStorageRefresh();
};

export const incrementRequestCount = () => {
  const count = Number(localStorage.getItem(QUESTION_COUNTER_KEY)) || 0;
  localStorage.setItem(`lastRequestDate`, new Date().toISOString());
  localStorage.setItem(QUESTION_COUNTER_KEY, `${count + 1}`);
  triggerLocalStorageRefresh();
};

export const decrementUploadCount = () => {
  const count = Number(localStorage.getItem(DOC_COUNTER_KEY)) || 0;
  setDocumentCount(count - 1);
};

export const getLastMonthRequestCount = () => {
  if (typeof localStorage === `undefined`) {
    return 10;
  }
  const lastRequestDate = new Date(
    localStorage.getItem(`lastRequestDate`) || new Date().toISOString()
  );
  const now = new Date();

  if (lastRequestDate.getMonth() !== now.getMonth()) {
    localStorage.setItem(QUESTION_COUNTER_KEY, `0`);
  }
  const n = Number(localStorage.getItem(QUESTION_COUNTER_KEY)) || 0;

  return n;
};

export const canAsk = async () => {
  const limit = await getQuestionLimit();

  return getLastMonthRequestCount() < limit;
};

export const DOC_COUNTER_KEY = `documentCount`;

export const QUESTION_COUNTER_KEY = `requestCount`;

export const incrementDocumentCount = () => {
  const count = Number(localStorage.getItem(DOC_COUNTER_KEY)) || 0;
  setDocumentCount(count + 1);
};

export const getDocumentCount = () =>
  typeof localStorage === `undefined`
    ? 0
    : Number(localStorage.getItem(DOC_COUNTER_KEY)) || 0;

export const canUpload = async () =>
  getDocumentCount() < (await getUploadLimit());
