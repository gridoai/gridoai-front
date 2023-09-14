"use client";

import { useMemo } from "react";
import { useI18n, useScopedI18n } from "../locales/client";
import { GradientText } from "./GradientBtn";
import PricingPage from "./PricingPage";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const UpgradeButton = () => {
  const t = useI18n();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="font-semibold">
          <GradientText> {t(`upgradeNow`)}</GradientText>
        </button>
      </DialogTrigger>
      <DialogContent className=" md:h-auto overflow-scroll flex flex-col">
        <div className="h-[80vh] overflow-scroll flex flex-col">
          <PricingPage />
        </div>
      </DialogContent>
    </Dialog>
  );
};
