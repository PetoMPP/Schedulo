"use client";

import Link from "next/link";
import useIsBiz from "../hooks/is-biz";

export default function Navbar() {
  const isBiz = useIsBiz();
  return (
    <div className="navbar fixed bg-gradient-to-b from-base-300 from-20% opacity-95">
      <div className="flex lg:w-1/2 lg:mx-auto">
        <div className="flex-1">
          <Link
            href={isBiz ? "/biz" : "/"}
            className="btn btn-ghost text-3xl text-base-content font-semibold"
          >
            {isBiz ? "Schedulo Biz" : "Schedulo"}
          </Link>
        </div>
        <div className="flex-none flex gap-2">
          {isBiz ? (
            <>
              <Link href="/biz/login" className="btn btn-ghost">
                Login
              </Link>
              <Link href="/" className="btn btn-ghost text-secondary">
                Go to appointments portal
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link href="/biz" className="btn btn-ghost text-secondary">
                Go to business owner portal
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
