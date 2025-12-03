import Link from "next/link";

export default function AuthBar() {
  return (
    <div>
      <Link
        className="btn btn-ghost"
        href="/auth/login">
        Login
      </Link>
      <Link
        className="btn btn-secondary"
        href="/auth/signup">
        Signup
      </Link>
    </div>
  );
}
