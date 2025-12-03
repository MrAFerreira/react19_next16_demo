"use client";

import { CommentWithAuthor } from "@/lib/posts";
import { useState, useEffect } from "react";
import { getPostComments } from "@/lib/posts";

export default function CommentsList() {
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const data = await getPostComments(1);
      setComments(data);
    }
    fetchComments();
  }, []);

  if (comments.length === 0) {
    return (
      <div className="text-center text-base-content/60 py-4">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div
          key={comment.id}
          className="card bg-base-200">
          <div className="card-body py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-8">
                    <span className="text-xs">
                      {comment.author.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className="font-semibold">{comment.author.name}</span>
              </div>
              <span
                className="text-sm text-base-content/60"
                suppressHydrationWarning>
                {comment.createdAt.toLocaleDateString("pt-PT", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="mt-2 text-base-content/80">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
