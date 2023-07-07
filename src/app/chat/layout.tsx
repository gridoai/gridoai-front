import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { SideMenu } from "../../components/menu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div
        className={
          "bg-[#141619] flex justify-between items-center px-3 py-4 border-b-[#30373d] border-b border-solid;"
        }
      >
        <UserButton
          appearance={{
            variables: {
              colorText: "white",
              colorBackground: "rgba(100,100,100,0.1)",
            },
          }}
          afterSignOutUrl="/sign-in"
        />
        <SideMenu />
      </div>
      {children}
    </div>
  );
};
export default Layout;
