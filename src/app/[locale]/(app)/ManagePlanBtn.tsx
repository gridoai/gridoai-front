"use client";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useI18n } from "../../../locales/client";
import { getPublicData } from "../../../services/auth";
import { useCurrentPlan } from "../../../hooks/useCurrentPlan";
import { usePlanUsage } from "../../../hooks/usePlanUsage";
import { plans } from "../../../services/rateLimit";
import { ManageSubscriptionBtn } from "./ManageSubscriptionBtn";
import { ArrowDown, CaretDown, CrownSimple } from "@phosphor-icons/react";
import { GradientText } from "../../../components/GradientBtn";
import { UpgradeButton } from "../../../components/upgradeButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import PricingPage from "../../../components/pricing";
import { useState } from "react";
import { CurrentPlan } from "../../../components/currentPlan";

export const ManagePlanBtn = ({
  children,
  title,
  freePlanTitle,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  freePlanTitle?: React.ReactNode;
}) => {
  const t = useI18n();
  const plan = useCurrentPlan();
  const planInfo = usePlanUsage();
  const planLimits = plans[plan || `free`];
  const [openPlanPage, setOpenPlanPage] = useState(false);

  const upgradeBtn = (
    <button
      onClick={() => {
        setOpenPlanPage(true);
      }}
      type="button"
      className="font-semibold"
    >
      <GradientText> {t(`upgradeNow`)}</GradientText>
    </button>
  );
  return (
    <>
      <DropdownMenu modal>
        <DropdownMenuTrigger>
          {plan === `free` ? (
            <div className="flex items-center gap-4">
              {freePlanTitle}
              {upgradeBtn}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <CrownSimple /> {title}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="backdrop-blur-lg bg-opacity-20 drop-shadow-lg">
          {plan !== `free` && (
            <>
              <DropdownMenuLabel>
                {t(`freePlanCard.title`, {
                  plan: t(`plans.${plan}`),
                })}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem>
            {planInfo.questionCount}/{planLimits.questionLimit}
            {` `}
            {t(`freePlanCard.questionsToday`)}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {planInfo.documentCount}/{planLimits.uploadLimit}
            {` `}
            {t(`freePlanCard.processedDocuments`)}
          </DropdownMenuItem>
          {plan !== `free` && (
            <>
              <DropdownMenuItem>
                {planInfo.memberCount}/{planLimits.membersLimit}
                {` `}
                {t(`freePlanCard.membersInvited`)}
              </DropdownMenuItem>
              <DropdownMenuItem>{children}</DropdownMenuItem>
              <DropdownMenuItem>
                {plan !== `enterprise` && upgradeBtn}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openPlanPage} onOpenChange={setOpenPlanPage}>
        <DialogTrigger />
        <DialogContent className="min-w-[90vw] min-h-[60vh]">
          <div className=" md:h-auto overflow-scroll flex flex-col">
            <PricingPage />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
