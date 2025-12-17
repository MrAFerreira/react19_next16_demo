import CounterSection from "@/components/CounterSection";
import LoadingDots from "@/components/ui/LoadingDots";
import UpdateUserName from "@/components/UpdateUsername";
import UserProfile from "@/components/UserProfile";
import { Suspense } from "react";

export default async function page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <LoadingDots />
              </div>
            }
          >
            <UserProfile />
          </Suspense>
          <div className="divider"></div>
          <UpdateUserName />
        </div>
      </div>
      <CounterSection />
    </div>
  );
}
