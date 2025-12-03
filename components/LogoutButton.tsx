"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <button type="button" onClick={handleLogout} className="btn btn-ghost">
      Logout
    </button>
  );
}
