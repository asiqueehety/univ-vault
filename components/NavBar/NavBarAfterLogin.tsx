'use client';

import Menu from "./Menu";
import Link from "next/link";
import { Jost } from "next/font/google";


const jost = Jost({
  subsets:["latin"],
  weight:["400"],
});

export default function NavBar() {
    async function logOut() {
        try {
            // Call the logout API to clear the httpOnly cookie on the server
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (!res.ok) throw new Error("Logout failed");

            // Remove token from localStorage (client-side storage)
            localStorage.removeItem('token');

            // Redirect to home (full page reload to trigger server component re-render)
            window.location.href = '/';
        } catch (err) {
            console.error("Logout error:", err);
            // Fallback: force reload anyway
            window.location.href = '/';
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">UnivVault</a>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link href='/'>Profile</Link></li>
                    <li><Link href='/settings'>Settings</Link></li>
                    <li><button onClick={logOut}>Logout</button></li>
                </ul>
                </div>
            </div>
            </div>
    );
}