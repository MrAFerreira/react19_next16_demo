"use client";
import { deletePost } from "@/actions/post";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function DeletePostButton({ postId }: { postId: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePost(postId);
      if (result?.success) {
        router.push("/dashboard");
      } else {
        setError(result?.message || "Failed to delete the post.");
      }
    });
  };
  return (
    <div>
      <button
        onClick={handleDelete}
        className="btn btn-circle btn-error"
        disabled={pending}
      >
        <Trash />
      </button>
      {error && <span>{error}</span>}
    </div>
  );
}
