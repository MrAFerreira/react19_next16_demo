"use client";

import { useActionState, useState } from "react";
import { editPost } from "@/actions/post";
import { Post } from "@/generated/prisma";
import { CreatePostFormState } from "@/lib/definitions";

export function PostEditForm({ initialPost }: { initialPost: Post }) {
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  const [state, action, pending] = useActionState(
    async (_prev: CreatePostFormState, formData: FormData) => {
      formData.set("postId", initialPost.id.toString());
      return await editPost(formData);
    },
    undefined,
  );

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
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
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
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
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
            "Save Changes"
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
