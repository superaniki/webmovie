import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="absolute w-full min-h-full h-auto bg-slate-200 ">
    <div className="relative text-center mt-10 ">
      {children}
    </div>
  </div>
}
export { Container }