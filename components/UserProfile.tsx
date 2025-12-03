import { getUserInfo } from "@/actions/profile";
import { use } from "react";

export default function UserProfile() {
  const user = use(getUserInfo());
  return (
    <div className="text-center">
      <div className="avatar placeholder mb-4">
        <div className="bg-primary text-primary-content rounded-full w-24">
          <span className="text-3xl">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-primary mb-2">
        Welcome, {user?.name}!
      </h1>
    </div>
  );
}
