import Chat from "@/components/Chat";
import { ClientProviders } from "../client-providers";

export default function Home() {
  return (
    <ClientProviders>
      <Chat />
    </ClientProviders>
  );
}
export const runtime = "edge";
