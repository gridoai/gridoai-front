"use client";

import { plans } from "../services/rateLimit";
import { Info } from "./icon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { usePlanUsage } from "../hooks/usePlanUsage";
import { useI18n } from "../locales/client";
import { UpgradeButton } from "./upgradeButton";
import { useCurrentPlan } from "../hooks/useCurrentPlan";

export const CurrentPlanIndicator = () => {
  const planInfo = usePlanUsage();
  const plan = useCurrentPlan();
  const t = useI18n();

  if ([`enterprise`, `pro`].includes(plan || ``)) {
    return;
  }

  const planLimits = plans[plan || `free`];
  return (
    <div className="flex items-center gap-1">
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <Info width={20} height={20} />
        </HoverCardTrigger>
        <HoverCardContent id="hover-card-content" className="bg-background">
          <PlanLimits planInfo={planInfo} planLimits={planLimits} />
        </HoverCardContent>
      </HoverCard>
      {t(`freePlanCard.title`, {
        plan: t(`plans.${plan || `free`}`),
      })}
      <UpgradeButton />
    </div>
  );
};
function PlanLimits({
  planInfo,
  planLimits,
}: {
  planInfo: {
    questionCount: number;
    documentCount: number;
    memberCount: number | undefined;
  };
  planLimits: {
    questionLimit: number;
    uploadLimit: number;
    membersLimit?: number | undefined;
  };
}) {
  const t = useI18n();

  return (
    <div className="flex flex-col gap-2 items-start justify-start">
      <div>
        {planInfo.questionCount}/{planLimits.questionLimit}
        {` `}
        {t(`freePlanCard.questions`)}
      </div>
      <div className="whitespace-nowrap">
        {planInfo.documentCount}/{planLimits.uploadLimit}
        {` `}
        {t(`freePlanCard.processedDocuments`)}
      </div>
    </div>
  );
}
