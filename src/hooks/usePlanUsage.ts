import { useLocalStorage } from "usehooks-ts";
import {
  DOC_COUNTER_KEY,
  QUESTION_COUNTER_KEY,
  getDocumentCount,
  getLastDayRequestCount,
} from "../services/rateLimit";

export const usePlanUsage = () => {
  const [questionCount] = useLocalStorage(
    QUESTION_COUNTER_KEY,
    getLastDayRequestCount()
  );
  const [documentCount] = useLocalStorage(DOC_COUNTER_KEY, getDocumentCount());
  return {
    questionCount,
    documentCount,
  };
};
