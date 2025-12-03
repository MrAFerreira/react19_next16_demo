"use client";

import { useActionState } from "react";
import { createPost } from "@/actions/post";

export function PostForm() {
  const [state, action, pending] = useActionState(createPost, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="form-control w-full">
        <label className="label" htmlFor="title">
          <span className="label-text font-semibold">Title</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter post title"
          className="input input-bordered w-full"
          required
        />
        {state?.errors?.title && (
          <label className="label">
            <span className="label-text-alt text-error">
              {state?.errors?.title}
            </span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="content">
          <span className="label-text font-semibold">Content</span>
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Write your post content here..."
          className="textarea textarea-bordered w-full min-h-[200px]"
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
      <label className="label" htmlFor="published">
        <input
          type="checkbox"
          name="published"
          defaultChecked
          className="checkbox"
        />
        Publish now
      </label>
      <div className="flex items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Create Post"
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
