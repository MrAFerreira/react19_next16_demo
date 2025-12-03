import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-8xl font-bold text-error mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-primary mb-4">Post Not Found</h2>
        <p className="text-base-content/70 mb-8 text-center max-w-md">
          The post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/posts" className="btn btn-primary btn-lg">
          Back to All Posts
        </Link>
      </div>
    </div>
  );
}
