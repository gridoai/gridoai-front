"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { List } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export function SideMenu({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <List />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none bg-background flex flex-col justify-end gap-4 items-end">
        <OrganizationSwitcher />
        {children}
      </SheetContent>
    </Sheet>
  );
}
