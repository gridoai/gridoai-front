import Link from "next/link";
import { getPublicData } from "../services/auth";
import { GradientText } from "./GradientBtn";
import { calendlyLink, whatsappLink } from "../app/links";
import { CurrentPlanIndicator } from "./freePlanCard";
import { getI18n } from "../locales/server";
import { UpgradeButton } from "./upgradeButton";

export const CurrentPlan = async () => {
  const plan = (await getPublicData()).plan || `free`;
  const label = plan === `free` ? <CurrentPlanIndicator /> : `Pro`;
  const t = await getI18n();
  return (
    <div className="p-2 rounded-md flex items-center gap-2 justify-start bg-card">
      {label}
      <UpgradeButton />
    </div>
  );
};
