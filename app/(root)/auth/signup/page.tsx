import { SignupForm } from "@/components/SignupForm";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold text-primary justify-center mb-4">
            Sign Up
          </h1>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
