const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-5">{children}</div>
    </div>
  );
};
export default Layout;
