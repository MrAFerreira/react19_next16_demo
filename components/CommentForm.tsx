"use client";

import { addComent, createComment } from "@/actions/post";
import { useActionState } from "react";

/* const commentFormAction = async (previousState, formData) => {
      const state = await addComent(formData);
      if (state.errors) {
        return state;
      }
      return null;
    }
 */
export function CommentForm({ postId }: { postId: number }) {
  const [state, action, pending] = useActionState(createComment, null);

  //useActionState
  // action
  //initialState
  return (
    <form
      action={action}
      className="flex flex-col gap-4">
      <div className="form-control w-full">
        <label
          className="label"
          htmlFor="content">
          <span className="label-text font-semibold text-lg">
            Leave a Comment
          </span>
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Write your comment here..."
          className="textarea textarea-bordered w-full min-h-[120px]"
          required
        />
        {state?.errors?.content && (
          <label className="label">
            <span className="label-text-alt text-error">
              {state?.errors?.content}
            </span>
          </label>
        )}
      </div>
      <input
        hidden
        name="postId"
        id="postId"
        defaultValue={+postId}
      />
      <div className="flex items-center gap-4">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={pending}>
          {pending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Post Comment"
          )}
        </button>
        {state?.message && (
          <div className="alert alert-info py-2">
            <span className="text-sm">{state.message}</span>
          </div>
        )}
      </div>
    </form>
  );
}
