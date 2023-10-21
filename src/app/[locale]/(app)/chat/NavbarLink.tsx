"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLink({
  path,
  icon,
  children,
}: {
  path: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const currentPath = usePathname()?.slice(4);
  console.log({ currentPath, path });
  return (
    <Link href={path}>
      <div
        className={`flex transition-all flex-1 gap-2 items-center justify-center h-full ${
          path.includes(currentPath || ``)
            ? `text-secondary border-b border-solid border-secondary`
            : ``
        }`}
      >
        {icon}
        {children}
      </div>
    </Link>
  );
}
