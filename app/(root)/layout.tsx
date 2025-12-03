import "../globals.css";
import React from "react";

import AuthBar from "@/components/ui/AuthBar";
export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen flex flex-col bg-base-200">
      <div className="m-4 self-end">
        <AuthBar />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
