import Link from "next/link";
import { Suspense } from "react";
import PostContent from "@/components/PostContent";
import { LikeButton } from "@/components/LikeButton";
import { CommentForm } from "@/components/CommentForm";
import LoadingDots from "@/components/ui/LoadingDots";
import RelatedAuthorPosts from "@/components/exercises/RelatedAuthorPosts";
import SmallCardSkeleton from "@/components/ui/SmallCardSkeleton";
import { ChevronLeft } from "lucide-react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //Exercise : create the variable to hold the related authors post promise and pass it as a prop to "RelatedAuthorPosts"

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/posts"
        className="btn btn-ghost btn-sm mb-6 gap-2">
        <ChevronLeft />
        Back to All Posts
      </Link>

      <div className="flex flex-col gap-8">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <LoadingDots />
            </div>
          }>
          <PostContent postId={+id} />
        </Suspense>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">More from this author</h3>
            {/* Add RelatedAuthorPosts here, wrapped in Suspense  */}
            {/* As a fallback for the suspense you can use the component "SmallCardSkeleton" */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LikeButton
            postId={+id}
            liked={false}
          />
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">{/* CommentForm goes here */}</div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Comments</h3>
            {/* Comments go here*/}
          </div>
        </div>
      </div>
    </div>
  );
}
