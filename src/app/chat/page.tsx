import Chat from "@/components/Chat";
import { ClientProviders } from "../client-providers";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  return <Chat />;
}
export const runtime = "edge";
