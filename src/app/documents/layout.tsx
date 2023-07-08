import Link from "next/link";
import { Button } from "../../components/ui/button";
import NavbarLayout from "../chat/layout";

export default ({ children }: React.ReactNode) => (
  <NavbarLayout
    Options={
      <Link href="/chat">
        <Button variant="outline">Chat</Button>
      </Link>
    }
  >
    <div className="p-8 bg-neutral-0">{children}</div>
  </NavbarLayout>
);
