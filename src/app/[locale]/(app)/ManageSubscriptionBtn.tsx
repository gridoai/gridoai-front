"use client";
import { ArrowSquareOut, Spinner } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getI18n } from "../../../locales/server";
import { useI18n } from "../../../locales/client";
import { makeBillingURL } from "../../../services/api";
import { useMutation } from "@tanstack/react-query";

export function ManageSubscriptionBtn() {
  const t = useI18n();
  const { mutate, isLoading } = useMutation(() =>
    makeBillingURL().then((url) => window.open(url, `_blank`))
  );
  return (
    <button
      type="button"
      className="items-center flex gap-2"
      onClick={() => {
        mutate();
      }}
    >
      {isLoading ? <Spinner className="animate-spin" /> : <ArrowSquareOut />}
      <p className="text-white">{t(`manageSubscription`)}</p>
    </button>
  );
}
