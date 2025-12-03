import { PostInfo } from "@/lib/posts";
import Link from "next/link";
import { use } from "react";

export default function RelatedAuthorPosts({
  relatedPostsPromise,
}: {
  relatedPostsPromise: Promise<PostInfo[]>;
}) {
  // The props are already setup
  // The PostInfo array will contain an array of objects with id, title and createdAt

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      Render Posts here
    </div>
  );
}
