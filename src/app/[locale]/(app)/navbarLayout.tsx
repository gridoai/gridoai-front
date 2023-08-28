import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { SideMenu } from "../../../components/menu";
import { Chat, Upload } from "../../../components/icon";
import { FreePlanCard } from "../../../components/freePlanCard";
import { NavbarLink } from "./chat/NavbarLink";

export const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <div
        className={` flex justify-between items-center px-3  border-b border-solid;`}
      >
        <NavbarRoutes />
        <div
          id="desktopMiddleSide"
          className="hidden md:flex gap-2 items-center"
        >
          <FreePlanCard />
        </div>
        <div
          id="desktopRightSide"
          className="hidden md:flex gap-2 items-center"
        >
          <OrganizationSwitcher />
        </div>
        <div id="mobileRightSide" className="flex md:hidden gap-2">
          <SideMenu>
            <div className="flex gap-2">
              <FreePlanCard />
            </div>
          </SideMenu>
        </div>
      </div>
      {children}
    </div>
  );
};
function NavbarRoutes() {
  return (
    <div className="flex gap-4 min-h-[65px]">
      <div className="flex items-center min-w-[32px]">
        <UserButton
          appearance={{
            variables: {
              colorText: `white`,
              colorBackground: `rgba(100,100,100,0.1)`,
            },
          }}
          afterSignOutUrl="/sign-in"
        />
      </div>

      <NavbarLink icon={<Chat />} path="/chat">
        Chat
      </NavbarLink>
      <NavbarLink icon={<Upload />} path="/documents">
        Upload
      </NavbarLink>
    </div>
  );
}
