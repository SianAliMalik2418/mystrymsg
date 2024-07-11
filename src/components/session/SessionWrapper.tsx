"use client";

import { SessionProvider } from "next-auth/react";

interface PropType {
  children: React.ReactNode;
}

const SessionWrapper = ({ children }: PropType) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
