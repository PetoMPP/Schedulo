export default function Navbar() {
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-2xl text-base-content font-semibold">Schedulo</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li className="min-w-36">
                        <details>
                            <summary>Login</summary>
                            <ul className="bg-base-100 rounded-t-none p-2 flex flex-col gap-1">
                                <li><a href="/user/login">User</a></li>
                                <li><a href="/owner/login">Bussiness owner</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}