import { getLatestComments } from "@/lib/posts";
import { Info } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";

export default async function LatestCommentsSolution() {
  "use cache";
  cacheLife("minutes");
  cacheTag("comments-latest");
  const comments = await getLatestComments(3);

  return (
    <div className="w-full">
      {comments.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <Info />
          <span>No comments yet. Login and create some!</span>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comments.map(comment => (
            <div
              key={comment.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-lg">{comment.content}</h2>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm text-base-content/60">
                    In : {comment.post.title}
                  </span>
                  <Link
                    href={`/posts/${comment.post.id}`}
                    className="btn btn-sm btn-primary">
                    Read Post
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
