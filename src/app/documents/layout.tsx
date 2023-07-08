import Link from "next/link";
import { Button } from "../../components/ui/button";
import NavbarLayout from "../chat/layout";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <NavbarLayout
    Options={
      <Link href="/chat">
        <Button variant="outline">Chat</Button>
      </Link>
    }
  >
    <div className="p-8 bg-neutral-0 flex-1">{children}</div>
  </NavbarLayout>
);

export default Layout;
