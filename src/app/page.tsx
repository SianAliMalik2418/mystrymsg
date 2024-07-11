"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      Hello
      <form>
        <input type="text" placeholder="Email" className="text-black" />
        <input type="text" placeholder="Password" className="text-black" />
        <button
          type="button"
          onClick={() =>
            signIn("credentials", {
              redirect: false,
              email: "ifiejfnng@gm.vom",
              password: "nnfnrgn",
            })
          }
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
