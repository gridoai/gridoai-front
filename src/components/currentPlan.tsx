import Link from "next/link";
import { getPublicData } from "../services/auth";
import { GradientText } from "./GradientBtn";
import { calendlyLink, whatsappLink } from "../app/links";
import { FreePlanCard } from "./freePlanCard";
import { getI18n } from "../locales/server";

export const CurrentPlan = async () => {
  const plan = (await getPublicData()).plan || `free`;
  const label = plan === `free` ? <FreePlanCard /> : `Pro`;
  const t = await getI18n();
  return (
    <div className="p-2 rounded-md flex items-center gap-2 justify-start bg-card">
      {label}
      <Link href={whatsappLink} target="_blank">
        <GradientText>{t(`upgradeNow`)}</GradientText>
      </Link>
    </div>
  );
};
