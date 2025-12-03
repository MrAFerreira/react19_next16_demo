import { getAuthorDrafts } from "@/lib/posts";
import { Info } from "lucide-react";
import Link from "next/link";

export default async function AuthorDrafts({ userId }: { userId: string }) {
  const posts = await getAuthorDrafts(userId);
  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <div className="alert alert-warning shadow-lg">
          <Info />
          <span>No drafts currently.</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="card bg-base-200 hover:shadow-lg transition-shadow border-l-4 border-warning">
              <div className="card-body">
                <div className="badge badge-warning badge-sm mb-2">Draft</div>
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
                    Preview
                  </Link>
                  <Link
                    href={`/dashboard/editor/${post.id}`}
                    className="btn btn-sm btn-secondary">
                    Continue Editing
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
