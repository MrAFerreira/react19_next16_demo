"use client";
import { updateUsername } from "@/actions/profile";
import { useActionState } from "react";

export default function UpdateUserName() {
  const [state, action, pending] = useActionState(updateUsername, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-primary">Update Your Name</h3>
      <div className="form-control w-full">
        <label className="label" htmlFor="name">
          <span className="label-text font-semibold">New Name</span>
        </label>
        <div className="join w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your new name"
            className="input input-bordered join-item flex-1"
          />
          <button type="submit" disabled={pending} className="btn btn-primary join-item">
            {pending ? <span className="loading loading-spinner loading-sm"></span> : "Update"}
          </button>
        </div>
      </div>
      {state?.message && (
        <div className={`alert ${state?.message.includes("success") ? "alert-success" : "alert-error"}`}>
          <span>{state?.message}</span>
        </div>
      )}
    </form>
  );
}
