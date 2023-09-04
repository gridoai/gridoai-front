import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { cookies } from "next/headers";

export const AuthProtectedBtn = ({
  children,
  fallback = `Sign in`,
}: {
  children: React.ReactNode;
  fallback?: string;
}) => {
  const auth = cookies();

  return auth?.get(`__session`)?.value ? (
    children
  ) : (
    <Link href="/sign-in">
      <Button variant="outline" className="transparent">
        {fallback}
      </Button>
    </Link>
  );
};
