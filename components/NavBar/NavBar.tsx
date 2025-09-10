import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets:["latin"],
  weight:["400"],
});

export default function NavBar() {
  return (
  <div className="navbar bg-emerald-950 shadow-sm">
    <div className="flex-none">
      <button className="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
      </button>
    </div>
    <div className="flex-1">
      <Link href="/" className={`btn btn-ghost text-xl ${jost.className}`}>UnivVault</Link>
    </div>
    <div className="flex gap-2">
      <Menu/>
    </div>
  </div>
  );
}