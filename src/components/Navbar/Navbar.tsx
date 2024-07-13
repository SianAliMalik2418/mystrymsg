import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import LogoutBtn from "./LogoutBtn";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: `${session ? "Dashboard" : "Sign In"}`,
      href: `${session ? "/dashboard" : "/auth/sign-in"}`,
    },
  ];

  return (
    <div className=" w-full bg-zinc-900 text-white flex items-center justify-between px-40 py-7">
      <Link href={"/"} className="text-2xl font-bold">
        mystry<span className="text-red-600">msg.</span>
      </Link>

      {session && <div>Hello {session.user.username}</div>}

      <div>
        <ul className="flex items-center gap-5">
          {navLinks.map((navItem) => (
            <Link key={navItem.href} href={navItem.href}>
              <li className="font-medium text-zinc-100 hover:text-zinc-300">
                {navItem.label}
              </li>
            </Link>
          ))}

          {session && <LogoutBtn />}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
