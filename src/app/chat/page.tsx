import Chat from "@/components/Chat";
import { ClientProviders } from "../client-providers";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  return (
    <ClientProviders>
      <Chat />
    </ClientProviders>
  );
}
export const runtime = "edge";
