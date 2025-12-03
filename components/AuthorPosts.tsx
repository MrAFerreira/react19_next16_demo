import { getAuthorPosts } from "@/lib/posts";
import { Info } from "lucide-react";
import Link from "next/link";

export default async function AuthorPosts({ userId }: { userId: string }) {
  const posts = await getAuthorPosts(userId);
  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <Info />
          <span>No published posts yet. Create some!</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="card bg-base-200 hover:shadow-lg transition-shadow">
              <div className="card-body">
                <h3 className="card-title text-lg">
                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </Link>
                </h3>
                <span
                  className="text-sm text-base-content/60"
                  suppressHydrationWarning>
                  {post.createdAt.toLocaleDateString("pt-PT", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/posts/${post.id}`}
                    className="btn btn-sm btn-ghost">
                    View
                  </Link>
                  <Link
                    href={`/dashboard/editor/${post.id}`}
                    className="btn btn-sm btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
