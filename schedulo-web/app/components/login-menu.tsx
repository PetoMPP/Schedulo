'use client'

import Link from "next/link"

export default function LoginMenu() {
    const clickMenu = () => document.getElementById("login-menu-summary")?.click();
    return (
        <ul className="menu menu-horizontal px-1">
            <li className="min-w-36">
                <details>
                    <summary id="login-menu-summary">Login</summary>
                    <ul className="bg-base-100 rounded-t-none p-2 flex flex-col gap-1">
                        <li><Link onClick={clickMenu} href="/login">User</Link></li>
                        <li><Link onClick={clickMenu} href="/biz/login">Bussiness owner</Link></li>
                    </ul>
                </details>
            </li>
        </ul>
    )
}