"use client";

import { PostInfo } from "@/lib/posts";
import Link from "next/link";
import { use } from "react";

export default function RelatedAuthorPosts({
  relatedPostsPromise,
}: {
  relatedPostsPromise: Promise<PostInfo[]>;
}) {
  const relatedPosts = use(relatedPostsPromise);

  if (!relatedPosts.length) {
    return (
      <div className="text-center text-base-content/60 py-2">
        <p>Author has no other posts yet.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map(post => (
        <div
          key={post.id}
          className="card bg-base-200 hover:shadow-lg transition-shadow">
          <div className="card-body py-4">
            <h4 className="card-title text-base">
              <Link
                href={`/posts/${post.id}`}
                className="hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </Link>
            </h4>
            <span
              className="text-xs text-base-content/60"
              suppressHydrationWarning>
              {post.createdAt.toLocaleDateString("pt-PT", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
