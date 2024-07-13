import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1200px] bg-zinc-100 mx-auto min-h-screen flex items-center justify-center ">
      {children}
    </div>
  );
};

export default Container;
