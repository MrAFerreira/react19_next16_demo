"use client";
import { BrainCog } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { use } from "react";
export default function Navbar({
  userInfoPromise,
}: {
  userInfoPromise: Promise<any>;
}) {
  const user = use(userInfoPromise);

  return (
    <header className="navbar bg-primary text-primary-content shadow-lg">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost text-xl gap-2">
          <BrainCog size={32} />
          <span className="font-bold">RNB</span>
        </Link>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="btn btn-ghost">
              Dashboard
            </Link>
            <Link
              href="/posts/create"
              className="btn btn-ghost">
              Create Post
            </Link>

            <Link
              href="/profile"
              className="btn btn-ghost">
              {user?.name}
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              className="btn btn-ghost"
              href="/auth/login">
              Login
            </Link>
            <Link
              className="btn btn-secondary"
              href="/auth/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
