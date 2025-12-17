"use client";

import { useOptimistic, useState, useTransition } from "react";
import { likePost } from "@/actions/post";
import { Heart } from "lucide-react";

export function LikeButton({
  postId,
  liked,
}: {
  postId: number;
  liked: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [likedState, setLikedState] = useState(liked);
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    likedState,
    (currentState: boolean, newLikedState: boolean) => newLikedState,
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLike(!optimisticLike);
      const result = await likePost(postId);
      if (result.success) {
        setLikedState(result.liked);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      /*
      we can disable it to avoid the user spamming the button
      disabled={isPending} */
      className={`btn ${optimisticLike ? "btn-warning" : "btn-primary"} gap-2`}
    >
      {optimisticLike ? <Heart fill="black" /> : <Heart />}
      {optimisticLike ? "Unlike" : "Like"}
    </button>
  );
}
