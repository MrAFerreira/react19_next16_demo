import { getUserInfo } from "@/actions/auth";
import AuthorDrafts from "@/components/AuthorDrafts";
import AuthorPosts from "@/components/AuthorPosts";
import LoadingDots from "@/components/ui/LoadingDots";
import { FileText, SquarePen } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const user = await getUserInfo();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        Dashboard
      </h1>

      <div className="grid gap-8">
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl text-primary mb-4">
              <FileText /> Your Published Posts
            </h2>
            <Suspense
              fallback={
                <div className="flex justify-center py-8">
                  <LoadingDots />
                </div>
              }>
              <AuthorPosts userId={user.id} />
            </Suspense>
          </div>
        </section>

        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl text-secondary mb-4">
              <SquarePen /> Your Drafts
            </h2>
            <Suspense
              fallback={
                <div className="flex justify-center py-8">
                  <LoadingDots />
                </div>
              }>
              <AuthorDrafts userId={user.id} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
