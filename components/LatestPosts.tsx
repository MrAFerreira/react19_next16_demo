import { getLatestPosts } from "@/lib/posts";
import { Info } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";

export default async function LatestPosts() {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts-latest");
  const posts = await getLatestPosts(3);

  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <Info />
          <span>No posts yet. Login and create some!</span>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-lg">
                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </Link>
                </h2>
                <div className="card-actions justify-between items-center mt-4">
                  <span
                    className="text-sm text-base-content/60"
                    suppressHydrationWarning>
                    {post.createdAt.toLocaleDateString("pt-PT", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/posts/${post.id}`}
                    className="btn btn-sm btn-primary">
                    Read More
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
