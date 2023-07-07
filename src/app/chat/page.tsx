import Chat from "@/components/Chat";
import { ClientProviders } from "../client-providers";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <ClientProviders>
      <Chat />
    </ClientProviders>
  );
}
export const runtime = "edge";
