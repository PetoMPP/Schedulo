import Link from "next/link";
import LoginMenu from "./login-menu";

export default function Navbar() {
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-2xl text-base-content font-semibold">Schedulo</Link>
            </div>
            <div className="flex-none">
                <LoginMenu />
            </div>
        </div>
    )
}