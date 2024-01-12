const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="md:p-8 p-4 bg-background flex-1 max-w-7xl xl:w-[80rem] xl:mx-auto">
    {children}
  </div>
);

export default Layout;
