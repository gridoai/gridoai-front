import Link from "next/link";
import { getPublicData } from "../services/auth";
import {
  getLastDayRequestCount,
  getDocumentCount,
} from "../services/rateLimit";
import { GradientText } from "./GradientBtn";
import { Info } from "./icon";
import { Button } from "./ui/button";
import { calendlyLink } from "../app/calendlyLink";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { FreePlanCard } from "./freePlanCard";

const capitalize = (s?: string) => {
  if (typeof s !== `string`) return ``;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const CurrentPlan = async () => {
  const plan = (await getPublicData()).plan || `free`;
  const label = plan === `free` ? <FreePlanCard /> : `Pro`;

  return (
    <div className="p-2 rounded-md flex items-center gap-2 justify-start bg-card">
      {label}
      <Link href={calendlyLink} target="_blank">
        <GradientText>Upgrade now</GradientText>
      </Link>
    </div>
  );
};
