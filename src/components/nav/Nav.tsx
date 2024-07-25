"use client";

import { usePathname } from "next/navigation";
import { PATH } from "s/constants/path.constant";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="NAV">
      <div>left button</div>
      <div>{PATH[pathname]}</div>
      <div>right button</div>
    </nav>
  );
}
