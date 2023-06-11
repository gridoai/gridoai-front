"use client";
import Chat from "@/components/Chat";
import { ToastProvider } from "@/components/toast";

export default function Home() {
  return (
    <ToastProvider>
      <Chat />
    </ToastProvider>
  );
}
