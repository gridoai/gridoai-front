"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useI18n } from "../../../locales/client";
import { useCurrentPlan } from "../../../hooks/useCurrentPlan";
import { usePlanUsage } from "../../../hooks/usePlanUsage";
import { plans } from "../../../services/rateLimit";
import { CrownSimple } from "@phosphor-icons/react";
import { GradientText } from "../../../components/GradientBtn";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import PricingPage from "../../../components/pricing";
import { useState } from "react";

const LimitIndicator = ({
  limit,
  current,
}: {
  limit: React.ReactNode;
  current: React.ReactNode;
}) => {
  return (
    <span className="flex items-center gap-1">
      {current}
      {limit !== Infinity && `/${limit}`}
    </span>
  );
};

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
          <DropdownMenuItem className="gap-1">
            <LimitIndicator
              limit={planLimits.questionLimit}
              current={planInfo.questionCount}
            />
            {` `}
            {t(`freePlanCard.questionsToday`)}
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-1">
            <LimitIndicator
              limit={planLimits.uploadLimit}
              current={planInfo.documentCount}
            />
            {` `}
            {t(`freePlanCard.processedDocuments`)}
          </DropdownMenuItem>
          {plan !== `free` && (
            <>
              <DropdownMenuItem className="gap-1">
                <LimitIndicator
                  limit={planLimits.membersLimit}
                  current={planInfo.memberCount}
                />
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
