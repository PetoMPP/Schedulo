"use client";

import Link from "next/link";
import useIsBiz from "../hooks/is-biz";
import NavbarMenu from "./navbar-menu";

export default function Navbar() {
  const isBiz = useIsBiz();
  return (
    <div className="navbar fixed bg-gradient-to-b from-base-300 from-20% to-base-100 opacity-95 z-50">
      <div className="flex lg:w-1/2 lg:mx-auto justify-between w-full">
        <div className="flex">
          <Link
            href={isBiz ? "/biz" : "/"}
            className="btn btn-ghost text-3xl text-base-content font-semibold"
          >
            {isBiz ? "Schedulo Biz" : "Schedulo"}
          </Link>
        </div>
        <div className="flex gap-2">
          <NavbarMenu />
        </div>
      </div>
    </div>
  );
}
