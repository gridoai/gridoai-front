import { Button } from "../../components/ui/button";
import { Chat } from "../../components/icon";
import Link from "next/link";

export function ChatButton({ className }: { className?: string }) {
  return (
    <Link href="/chat">
      <Button variant="outline" className={`${className} flex gap-2`}>
        <Chat color="white" />
        Chat
      </Button>
    </Link>
  );
}
