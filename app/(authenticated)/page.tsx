import LatestPosts from "@/components/LatestPosts";
import LatestComments from "@/components/solutions/LatestCommentsSolution";
import LoadingDots from "@/components/ui/LoadingDots";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <section className="hero min-h-[calc(100vh-4rem)] bg-base-200">
        <div className="hero-content text-center flex-col">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Latest Posts
            </h1>
            <p className="text-base-content/70 mb-8">
              Discover the latest articles and stories from our community.
            </p>
          </div>
          <div className="w-full max-w-4xl">
            <Suspense
              fallback={
                <div className="flex justify-center">
                  <LoadingDots />
                </div>
              }>
              <LatestPosts />
            </Suspense>
          </div>
          <Link
            className="btn btn-primary btn-lg mt-6"
            href="/posts">
            View All Posts
          </Link>
          <div className="max-w-2xl mt-10">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Latest Comments
            </h1>
            <p className="text-base-content/70 mb-8">What people are saying.</p>
          </div>
          <div className="w-full max-w-4xl">
            {/* Insert latest comments here */}
          </div>
        </div>
      </section>
    </>
  );
}
