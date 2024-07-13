import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Sign Up",
      href: "/auth/sign-up",
    },
  ];

  return (
    <div className=" w-full bg-zinc-900 text-white flex items-center justify-between px-40 py-7">
      <h1 className="text-2xl font-bold">
        mystry<span className="text-red-600">msg.</span>
      </h1>

      <div>
        <ul className="flex items-center gap-5">
          {navLinks.map((navItem) => (
            <Link key={navItem.href} href={navItem.href}>
              <li className="font-medium text-zinc-100 hover:text-zinc-300">
                {navItem.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
