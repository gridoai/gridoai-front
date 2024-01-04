"use client";
import { currentEndpoint } from "@/services/api";
import { getToken, getTokenFromCookie } from "@/services/auth";
import { useClerk } from "@clerk/nextjs";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";
import { useEffectOnce } from "usehooks-ts";

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

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  useEffectOnce(() => {
    const originalReqToken = client.auth.requestToken.bind(client.auth);
    client.auth.requestToken = async (params, authOptions) => {
      return originalReqToken(params, {
        ...authOptions,
        authHeaders: {
          Authorization: `Bearer ${await window.Clerk?.session?.getToken()}`,
        },
      });
    };
  });
  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default React.memo(NotificationsProvider);
