import { getPublicData } from "./auth";

const getQuestionLimit = async () => (await getPublicData()).questionLimit;
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
  return Number(localStorage.getItem(`requestCount`)) || 0;
};

export const canAsk = async () =>
  getLastDayRequestCount() > ((await getQuestionLimit()) || 10);
