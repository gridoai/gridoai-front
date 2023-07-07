import { UserButton, OrganizationSwitcher } from "@clerk/nextjs/app-beta";

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
        <OrganizationSwitcher />
      </div>
      {children}
    </div>
  );
};
export default Layout;
