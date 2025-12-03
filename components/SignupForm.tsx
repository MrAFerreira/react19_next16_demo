"use client";

import { signup } from "@/actions/auth";
import { useActionState } from "react";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form className="flex flex-col gap-4" action={action}>
      <div className="form-control w-full">
        <label className="label" htmlFor="name">
          <span className="label-text font-semibold">Name</span>
        </label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full"
        />
        {state?.errors?.name && (
          <label className="label">
            <span className="label-text-alt text-error">{state?.errors.name}</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="email">
          <span className="label-text font-semibold">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
        />
        {state?.errors?.email && (
          <label className="label">
            <span className="label-text-alt text-error">{state?.errors.email}</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="password">
          <span className="label-text font-semibold">Password</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
        />
        {state?.errors?.password && (
          <div className="mt-2">
            <p className="text-sm text-error">Password must:</p>
            <ul className="text-sm text-error list-disc list-inside">
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {state?.message && (
        <div className="alert alert-error">
          <span>{state?.message}</span>
        </div>
      )}
      <button
        className="btn btn-primary w-full mt-2"
        disabled={pending}
        type="submit"
      >
        {pending ? <span className="loading loading-spinner loading-sm"></span> : "Sign Up"}
      </button>
    </form>
  );
}
