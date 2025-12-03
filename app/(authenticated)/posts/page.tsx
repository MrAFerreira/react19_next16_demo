import Link from "next/link";
import { getAllPosts, getPostsByQuery } from "@/lib/posts";
import SearchForm from "@/components/SearchForm";
import { Info } from "lucide-react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  let posts;
  if (query) {
    posts = await getPostsByQuery(query);
  } else {
    posts = await getAllPosts();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-primary">All Posts</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SearchForm query={query} />
          <Link
            href="/posts/create"
            className="btn btn-primary">
            Create New Post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <Info />
          <span>No posts yet. Create your first post!</span>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-xl">
                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-base-content/70 line-clamp-3">
                  {post.excerpt}
                </p>
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
