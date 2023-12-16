import { useQuery } from "@tanstack/react-query";
import { Plan, getPublicData } from "../services/auth";
import { useOrgChanges } from "./useOrgChanges";

export const useCurrentPlan = () => {
  const { data, refetch } = useQuery({
    queryKey: [`plan`],
    queryFn: getPublicData,
  });
  useOrgChanges(refetch);
  return data?.plan || `free`;
};
type PlanCapability = `gdrive`;

const capabilities: Record<Plan, Record<PlanCapability, number | boolean>> = {
  free: {
    gdrive: 0,
  },
  pro: {
    gdrive: true,
  },
  enterprise: {
    gdrive: true,
  },
  individual: {
    gdrive: true,
  },
  starter: {
    gdrive: true,
  },
};

export const useCurrentPlanCapabilities = () => {
  return capabilities[useCurrentPlan()];
};
