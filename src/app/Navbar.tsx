import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { landingPageContent } from "./page";

export function Navbar() {
    const user = auth();

    return (
        <nav className=" fixed w-full z-10 flex items-center backdrop-blur-md bg-opacity-20 drop-shadow-lg border-b border-neutral-2 justify-between px-8 py-6">
            <div className="text-2xl font-bold flex justify-between">
                {landingPageContent.navTitle}
            </div>
            {user.sessionId ? (
                <Link href="/chat">
                    <Button className="transparent" variant="outline">
                        Go to chat
                    </Button>
                </Link>
            ) : (
                <>
                    <Link href="/sign-in">
                        <Button variant="outline" className="mr-2 transparent">
                            Login
                        </Button>
                    </Link>
                </>
            )}
        </nav>
    );
}
