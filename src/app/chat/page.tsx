import Chat from "@/components/Chat";
import { ClientProviders } from "../client-providers";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const user = auth();
  if (!user.userId) {
    redirect("/sign-in");
  }
  return (
    <ClientProviders>
      <Chat />
    </ClientProviders>
  );
}
export const runtime = "edge";
