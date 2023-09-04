"use client";

import { ToastProvider } from "@/components/toast";
import { useOrganizationList } from "@clerk/nextjs";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryParams = useSearchParams();
  const org = useOrganizationList();

  useEffect(() => {
    if (queryParams.get(`postSale`) && org.setActive) {
      const target = org.organizationList?.[0];
      org.setActive?.({
        organization: target?.organization.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org.setActive, queryParams]);

  return <ToastProvider>{children}</ToastProvider>;
};
