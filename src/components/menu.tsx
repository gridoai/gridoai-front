import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none bg-background flex flex-col justify-end gap-4 items-end">
        <OrganizationSwitcher defaultOpen />
        <Link href="/documents">
          <Button variant="outline">Manage documents</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
