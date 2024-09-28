import Link from "next/link";
import LoginMenu from "./login-menu";

export default function Navbar() {
    return (
        <div className="navbar fixed bg-gradient-to-b from-base-300 from-20% opacity-95">
            <div className="flex lg:w-1/2 lg:mx-auto">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-3xl text-base-content font-semibold">Schedulo</Link>
                </div>
                <div className="flex-none">
                    <LoginMenu />
                </div>
            </div>
        </div>
    )
}