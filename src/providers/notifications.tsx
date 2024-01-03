"use client";
import { currentEndpoint } from "@/services/api";
import { getToken, getTokenFromCookie } from "@/services/auth";
import { useClerk } from "@clerk/nextjs";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const authUrl =
  typeof window !== `undefined`
    ? `${currentEndpoint()}/notifications/auth`
    : ``;

const client = new Ably.Realtime.Promise({
  authUrl,
  authHeaders: {
    Authorization: `Bearer ${getTokenFromCookie()}`,
  },
});
const NotificationsProviderBase = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const clerk = useClerk();

  const originalReqToken = client.auth.requestToken.bind(client.auth);
  client.auth.requestToken = async (params, authOptions) => {
    return originalReqToken(params, {
      ...authOptions,
      authHeaders: {
        Authorization: `Bearer ${await clerk.session?.getToken()}`,
      },
    });
  };

  return <AblyProvider client={client}>{children}</AblyProvider>;
};
const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary errorComponent={() => children}>
      <NotificationsProviderBase>{children}</NotificationsProviderBase>
    </ErrorBoundary>
  );
};
export default NotificationsProvider;
