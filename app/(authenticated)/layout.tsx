import "../globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import LoadingDots from "@/components/ui/LoadingDots";
import { getUserInfo } from "@/actions/auth";
export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userInfoPromise = getUserInfo();

  return (
    <main className="min-h-screen flex flex-col bg-base-200">
      <Suspense fallback={<div className="navbar bg-primary h-16" />}>
        <Navbar userInfoPromise={userInfoPromise} />
      </Suspense>
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[50vh]">
              <LoadingDots />
            </div>
          }>
          {children}
        </Suspense>
      </div>
    </main>
  );
}
