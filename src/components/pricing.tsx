"use client";
/* eslint-disable quotes */
import { useAuth, useUser } from "@clerk/nextjs";
import * as React from "react";
import { getToken, getTokenFromCookie, parseJwt } from "../services/auth";
import { useRouter } from "next/navigation";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
function PricingPage() {
  const user = useUser();

  return (
    <>
      <stripe-pricing-table
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
        pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        costumer-email={user.user?.emailAddresses[0].emailAddress}
        client-reference-id={user.user?.id}
      />
      <div className="w-full h-1 -translate-y-1 z-10 bg-background" />
    </>
  );
}

export default PricingPage;
export const AuthProtectedPricingPage = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div>
      {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="z-10 absolute"
        onClick={(evt) => {
          evt.stopPropagation();
          evt.preventDefault();

          console.log({
            isSignedIn,
          });
          if (!isSignedIn) {
            router.push("/sign-in?redirect=/#pricing");
          }
        }}
      />
      <div id="pricing-table" ref={ref}>
        <PricingPage />
      </div>
    </div>
  );
};
