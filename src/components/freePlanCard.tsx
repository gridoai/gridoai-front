"use client";

import Link from "next/link";
import { calendlyLink, whatsappLink } from "../app/links";
import {
  getLastDayRequestCount,
  getDocumentCount,
} from "../services/rateLimit";
import { GradientText } from "./GradientBtn";
import { Info } from "./icon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { usePlanUsage } from "../hooks/usePlanUsage";
import { useQuery } from "@tanstack/react-query";
import { getPublicData } from "../services/auth";
import { useI18n } from "../locales/client";

export const FreePlanCard = () => {
  const planInfo = usePlanUsage();
  const { data } = useQuery({
    queryKey: [`plan`],
    queryFn: getPublicData,
  });
  const t = useI18n();
  if (data?.plan === `pro`) {
    return;
  }
  return (
    <>
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <Info width={20} height={20} />
        </HoverCardTrigger>
        <HoverCardContent className="bg-background">
          <div className="flex flex-col gap-2 items-start justify-start">
            <div>
              {planInfo.questionCount}/10 {t(`freePlanCard.questionsToday`)}
            </div>
            <div className="whitespace-nowrap">
              {planInfo.documentCount}/5 {t(`freePlanCard.processedDocuments`)}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      {t(`freePlanCard.title`)}
      <Link href={whatsappLink} target="_blank">
        <GradientText> {t(`upgradeNow`)}</GradientText>
      </Link>
    </>
  );
};
