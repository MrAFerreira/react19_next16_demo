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
    likedState, // state atual
    (_currentState: boolean, newLikedState: boolean) => newLikedState // updater function
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLike(!optimisticLike); // atualizar o state mesmo antes da resposta do servidor
      const result = await likePost(postId);
      if (result.success) {
        setLikedState(result.liked); // caso seja o mesmo, nada acontece, se houver um erro, é revertido
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      /* disabled={isPending}  */
      className={`btn ${optimisticLike ? "btn-warning" : "btn-primary"} gap-2`}>
      {optimisticLike ? <Heart fill="black" /> : <Heart />}
      {optimisticLike ? "Unlike" : "Like"}
    </button>
  );
}
