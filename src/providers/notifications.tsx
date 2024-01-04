"use client";
import { api } from "@/services/api";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import React from "react";

const isServer = typeof window === `undefined`;

let client: Ably.Types.RealtimePromise;
if (!isServer) {
  client = new Ably.Realtime.Promise({
    authCallback: async (tokenParams, callback) => {
      callback(null, (await api.get(`/notifications/auth`)).data);
    },
  });
}

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default NotificationsProvider;
