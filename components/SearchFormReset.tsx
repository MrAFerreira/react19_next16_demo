"use client";
import { X } from "lucide-react";
import Link from "next/link";

export default function SearchFormReset() {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" className="btn btn-error join-item" onClick={reset}>
      <Link href="/posts">
        <X className="w-5 h-5" />
      </Link>
    </button>
  );
}
