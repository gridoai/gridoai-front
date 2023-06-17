import Chat from "@/components/Chat";
import { auth } from "@clerk/nextjs";
import { ClientProviders } from "../client-providers";

export default function Home() {
  const u = auth();
  console.log(u);
  return (
    <ClientProviders>
      <Chat />
    </ClientProviders>
  );
}
