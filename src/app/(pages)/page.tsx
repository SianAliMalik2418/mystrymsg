"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      Hello from Home
      <h1 className="text-red-500">Hi</h1>
    </main>
  );
}
