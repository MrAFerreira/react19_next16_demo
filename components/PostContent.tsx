import { auth } from "@/lib/auth";
import { getPostByIdWithLikes } from "@/lib/posts";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function PostContent({ postId }: { postId: number }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const post = await getPostByIdWithLikes(postId, session?.user?.id ?? "");
  if (!post) {
    notFound();
  }

  return (
    <article className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-4xl font-bold text-primary mb-2">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-base-content/60 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span suppressHydrationWarning>
            Published on{" "}
            {post.createdAt.toLocaleDateString("pt-PT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="divider"></div>
        <div className="prose prose-lg max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-base leading-relaxed text-base-content/80">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
