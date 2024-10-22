import { useLocalStorage } from "usehooks-ts";
import {
  DOC_COUNTER_KEY,
  QUESTION_COUNTER_KEY,
  getDocumentCount,
  getLastMonthRequestCount,
} from "../services/rateLimit";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

export const usePlanUsage = () => {
  const [questionCount] = useLocalStorage(
    QUESTION_COUNTER_KEY,
    getLastMonthRequestCount()
  );
  const [documentCount] = useLocalStorage(DOC_COUNTER_KEY, getDocumentCount());
  const { membershipList } = useOrganization();
  return {
    questionCount,
    documentCount,
    memberCount: membershipList?.length || 1,
  };
};
