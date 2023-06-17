"use client";

import { ToastProvider } from "@/components/toast";

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ToastProvider>{children}</ToastProvider>;
};
