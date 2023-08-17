"use client";

import Link from "next/link";
import { calendlyLink } from "../app/calendlyLink";
import {
  getLastDayRequestCount,
  getDocumentCount,
} from "../services/rateLimit";
import { GradientText } from "./GradientBtn";
import { Info } from "./icon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { usePlanUsage } from "../hooks/usePlanUsage";

export const FreePlanCard = () => {
  const planInfo = usePlanUsage();
  return (
    <>
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <Info width={20} height={20} />
        </HoverCardTrigger>
        <HoverCardContent className="bg-background">
          <div className="flex flex-col gap-2 items-center">
            <div>{planInfo.questionCount}/10 questions today</div>
            <div>{planInfo.documentCount}/5 documents stored</div>
          </div>
        </HoverCardContent>
      </HoverCard>
      Free plan
      <Link href={calendlyLink} target="_blank">
        <GradientText>Upgrade now</GradientText>
      </Link>
    </>
  );
};
