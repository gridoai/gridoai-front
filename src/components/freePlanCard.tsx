"use client";

import { getLastDayRequestCount, getUploadCount } from "../services/rateLimit";
import { Info } from "./icon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export const FreePlanCard = () => (
  <>
    <HoverCard openDelay={0}>
      <HoverCardTrigger>
        <Info width={20} height={20} />
      </HoverCardTrigger>
      <HoverCardContent className="bg-background">
        <div className="flex flex-col gap-2 ">
          <div>{getLastDayRequestCount()}/10 requests today</div>
          <div>{getUploadCount()}/5 uploads</div>
        </div>
      </HoverCardContent>
    </HoverCard>
    Free plan
  </>
);
