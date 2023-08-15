import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { SideMenu } from "../../components/menu";
import { Button } from "../../components/ui/button";
import Link from "next/link";

const DocsLink = (
  <Link href="/documents">
    <Button variant="outline">Manage documents</Button>
  </Link>
);

export const NavbarLayout = ({
  children,
  Options = DocsLink,
}: {
  children: React.ReactNode;
  Options: React.ReactNode;
}) => {
  return (
    <div className="flex flex-1 flex-col bg-background max-h-screen overflow-hidden">
      <div
        className={` flex justify-between items-center px-3 py-4  border-b border-solid;`}
      >
        <UserButton
          appearance={{
            variables: {
              colorText: `white`,
              colorBackground: `rgba(100,100,100,0.1)`,
            },
          }}
          afterSignOutUrl="/sign-in"
        />
        <div className="flex gap-2">
          {Options}
          <OrganizationSwitcher defaultOpen />
        </div>
      </div>
      {children}
    </div>
  );
};
export default NavbarLayout;
