import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          //   className="h-16 w-16 rounded-full"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none bg-neutral-0 flex flex-col justify-end gap-4 items-end">
        <OrganizationSwitcher />
        <Link href="/documents">
          <Button variant="outline">Manage documents</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
