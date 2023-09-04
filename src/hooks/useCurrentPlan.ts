import { useQuery } from "@tanstack/react-query";
import { getPublicData } from "../services/auth";
import { useOrgChanges } from "./useOrgChanges";

export const useCurrentPlan = () => {
  const { data, refetch } = useQuery({
    queryKey: [`plan`],
    queryFn: getPublicData,
  });
  useOrgChanges(refetch);
  return data?.plan || `free`;
};
