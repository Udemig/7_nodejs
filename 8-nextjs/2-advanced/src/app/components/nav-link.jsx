"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  // url'deki path değerini getirir
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path === href ? "bg-blue-500 p-2 rounded-md" : "p-2"}
    >
      {children}
    </Link>
  );
};

export default NavLink;
