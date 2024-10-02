"use client";

import React from "react";
import Link from "next/link";
import useIsBiz from "../hooks/is-biz";
import useWindowWidth, { WindowWidth } from "../hooks/window-size";

export default function NavbarMenu() {
  const isBiz = useIsBiz();
  const width = useWindowWidth();
  const clickMenu = () =>
    document.getElementById("navbar-menu-summary")?.click();
  const links = isBiz
    ? [
        <Link key="biz-login" href="/biz/login" className="btn btn-ghost">
          Login
        </Link>,
        <Link key="login" href="/" className="btn btn-ghost text-secondary break-words">
          Go to appointments portal
        </Link>,
      ]
    : [
        <Link key="biz-login" href="/login" className="btn btn-ghost">
          Login
        </Link>,
        <Link key="login" href="/biz" className="btn btn-ghost text-secondary break-words">
          Go to business owner portal
        </Link>,
      ];
  if (width > WindowWidth.Large) {
    return <>{links}</>;
  }

  return (
    <ul className="menu menu-horizontal px-1">
      <li className="">
        <details>
          <summary id="navbar-menu-summary" className="text-xl font-semibold">
            Menu
          </summary>
          <ul className="bg-base-100 rounded-t-none p-2 flex flex-col gap-1 right-0">
            {links.map((link, i) => (
              <li key={i} onClick={clickMenu}>
                {link}
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
}
