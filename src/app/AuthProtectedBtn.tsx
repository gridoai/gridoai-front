"use client";
import { auth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";

export const AuthProtectedBtn = ({
  children,
  fallback = `Sign in`,
}: {
  children: React.ReactNode;
  fallback?: string;
}) => {
  const user = useUser();
  return user.isSignedIn ? (
    children
  ) : (
    <Link href="/sign-in">
      <Button variant="outline" className="transparent">
        {fallback}
      </Button>
    </Link>
  );
};
