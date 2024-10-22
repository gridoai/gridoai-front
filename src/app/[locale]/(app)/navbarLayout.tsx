import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { SideMenu } from "../../../components/menu";
import { Chat, Upload } from "@phosphor-icons/react/dist/ssr";
import { NavbarLink } from "./chat/NavbarLink";
import { getI18n } from "../../../locales/server";
import { ManageSubscriptionBtn } from "./ManageSubscriptionBtn";
import { ManagePlanBtn } from "./ManagePlanBtn";
export const NavbarLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = await getI18n();

  return (
    <div className="flex flex-1 min-h-screen flex-col bg-background">
      <div
        className={` flex justify-between items-center px-3  border-b border-solid;`}
      >
        <NavbarRoutes />

        <div
          id="desktopRightSide"
          className="hidden md:flex gap-2 items-center"
        >
          <OrganizationSwitcher />
        </div>
        <div id="mobileRightSide" className="flex md:hidden gap-2">
          <SideMenu>
            <div className="flex gap-2">
              <ManagePlanBtn
                title={t(`managePlan`)}
                freePlanTitle={t(`freePlanCard.title`, {
                  plan: t(`plans.free`),
                })}
              >
                <ManageSubscriptionBtn />
              </ManagePlanBtn>
            </div>
          </SideMenu>
        </div>
      </div>
      {children}
    </div>
  );
};
async function NavbarRoutes() {
  const t = await getI18n();

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
      <NavbarLink icon={<Upload />} path="/documents?pageSize=10&current=1">
        Upload
      </NavbarLink>
      <div className="hidden md:flex">
        <ManagePlanBtn
          title={t(`managePlan`)}
          freePlanTitle={t(`freePlanCard.title`, {
            plan: t(`plans.free`),
          })}
        >
          <ManageSubscriptionBtn />
        </ManagePlanBtn>
      </div>
    </div>
  );
}
