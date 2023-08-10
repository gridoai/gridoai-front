import { getPublicData } from "./auth";

export const freePlan = {
  questionLimit: 10,
  uploadLimit: 5,
};

export const isFreePlan = async (fetchPublicData = getPublicData) => {
  const currentPlan = (await fetchPublicData().catch(console.error))?.plan;
  if (!currentPlan) return true;
  return currentPlan === `free` ? true : false;
};

export const getQuestionLimit = async () =>
  (await isFreePlan()) ? freePlan.questionLimit : Infinity;

export const getUploadLimit = async () =>
  (await isFreePlan()) ? freePlan.uploadLimit : Infinity;

export const incrementRequestCount = () => {
  const count = Number(localStorage.getItem(`requestCount`)) || 0;
  localStorage.setItem(`lastRequestDate`, new Date().toISOString());
  localStorage.setItem(`requestCount`, `${count + 1}`);
};

export const getLastDayRequestCount = () => {
  const lastRequestDate = new Date(
    localStorage.getItem(`lastRequestDate`) || new Date().toISOString()
  );
  const now = new Date();
  const diff = now.getTime() - lastRequestDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  if (diffDays > 1) {
    localStorage.setItem(`requestCount`, `0`);
  }
  const n = Number(localStorage.getItem(`requestCount`)) || 0;
  console.log(`getLastDayRequestCount`, n);
  return n;
};

export const canAsk = async () => {
  const limit =
    (await getQuestionLimit().catch(console.error)) || freePlan.questionLimit;

  console.log(`canAsk`, getLastDayRequestCount(), `<`, limit);
  return getLastDayRequestCount() < limit;
};

export const incrementUploadCount = () => {
  const count = Number(localStorage.getItem(`uploadCount`)) || 0;
  localStorage.setItem(`uploadCount`, `${count + 1}`);
};

export const getUploadCount = () =>
  Number(localStorage.getItem(`uploadCount`)) || 0;

export const canUpload = async () =>
  getUploadCount() < ((await getUploadLimit()) || freePlan.uploadLimit);
