"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { PricingPageBase } from "./pricing";

export const PricingPage = () => {
  const PagePromise = dynamic(() => Promise.resolve(PricingPageBase), {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  });
  return (
    <div className="w-full h-full">
      <PagePromise />
    </div>
  );
};
export default PricingPage;
