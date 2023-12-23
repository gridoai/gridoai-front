"use client";

import { ToastProvider } from "@/components/toast";
import { useOrganizationList } from "@clerk/nextjs";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { getTokenFromCookie } from "@/services/auth";

const endpoint =
  localStorage.getItem(`baseURL`) ||
  window.baseURL ||
  process.env.NEXT_PUBLIC_API_URL;

const client = new Ably.Realtime.Promise({
  authUrl:
    typeof window !== `undefined` ? `${endpoint}/notifications/auth` : ``,
  authHeaders: {
    Authorization: `Bearer ${getTokenFromCookie()}`,
  },
});

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryParams = useSearchParams();
  const org = useOrganizationList();

  useEffect(() => {
    client.connection.on(`failed`, function (stateChange) {
      console.log(`Ably connection failed with error: ` + stateChange.reason);
      client.auth.requestToken(
        {},
        {
          authHeaders: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    if (queryParams?.get(`postSale`) && org.setActive) {
      const target = org.organizationList?.[0];
      org.setActive?.({
        organization: target?.organization.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org.setActive, queryParams]);

  return (
    <ToastProvider>
      <AblyProvider client={client}>{children}</AblyProvider>
    </ToastProvider>
  );
};
export default ClientProviders;
