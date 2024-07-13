"use client";

import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <li className="cursor-pointer" onClick={() => signOut()}>
      Logout
    </li>
  );
};

export default LogoutBtn;
