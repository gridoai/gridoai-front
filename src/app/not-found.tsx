"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const route = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!(path.startsWith(`/en`) || path.startsWith(`/pt`))) {
      console.log(`redirecting to /en`);
      route.replace(`/en`);
    }
  }, [path, route]);
  return (
    <div>
      <h1>404: Page Not Found</h1>
    </div>
  );
};
export default NotFound;
