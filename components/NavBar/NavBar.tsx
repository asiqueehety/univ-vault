import Menu from "./Menu";
import Link from "next/link";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets:["latin"],
  weight:["400"],
});

export default function NavBar() {
  return (
  <div className="navbar bg-black/10 shadow-sm">
    <div className="flex-none">
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