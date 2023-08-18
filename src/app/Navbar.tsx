import { auth } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { landingPageContent } from "./[locale]/page";
import { AuthProtectedBtn } from "./AuthProtectedBtn";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className=" fixed w-full z-10 flex items-center backdrop-blur-md bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
      <div className="text-2xl font-bold flex justify-between">
        {landingPageContent.navTitle}
      </div>
      <AuthProtectedBtn>
        <Link href="/chat">
          <Button className="transparent" variant="outline">
            Go to chat
          </Button>
        </Link>
      </AuthProtectedBtn>
    </nav>
  );
}
