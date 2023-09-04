"use client";
/* eslint-disable quotes */
import { useAuth, useUser } from "@clerk/nextjs";
import * as React from "react";
import { getToken, getTokenFromCookie, parseJwt } from "../services/auth";
import { useRouter } from "next/navigation";
const devPricingTable = "prctbl_1NkpnYGzZugcM7iPg3rPFiaj";
const prodPricingTable = "prctbl_1NjT0RGzZugcM7iPSZmnyuX0";
const devKey =
  "pk_test_51Nj6zvGzZugcM7iP5Jz365px8IYzAAzCZLpr38Efzv3q8LBZbLedtTfsAsRXTfTuUnTQZWM2W2KoCugg8bm2ipYu00m7O8DN8X";
const prodKey =
  "pk_live_51Nj6zvGzZugcM7iP4BH7s64lF4N4DLgeWguiYLRlw70M6Xmxu1axazDqlwCe3dd78KrvWxY812WPzRMBPjHIXzWG00r8g6gYuE";
// If using TypeScript, add the following snippet to your file as well.
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
        pricing-table-id={devPricingTable}
        publishable-key={devKey}
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
