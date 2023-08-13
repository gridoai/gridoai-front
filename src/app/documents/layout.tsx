import Link from "next/link";
import NavbarLayout from "../chat/layout";
import { SideMenu } from "../../components/menu";
import { CurrentPlan } from "../../components/currentPlan";
import { ChatButton } from "./ChatButton";
import { OrganizationSwitcher } from "@clerk/nextjs";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <NavbarLayout
    Options={
      <>
        <div className="flex gap-2">
          <ChatButton className="hidden md:flex" />
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: `hidden md:flex`,
              },
            }}
          />

          <SideMenu>
            <CurrentPlan />
          </SideMenu>
        </div>
      </>
    }
  >
    <div className="p-8 bg-background flex-1">{children}</div>
  </NavbarLayout>
);

export default Layout;
