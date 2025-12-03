import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="hero min-h-[calc(100vh-4rem)] bg-base-200">
        <div className="hero-content text-center flex-col">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Join Our Community
            </h1>
            <p className="text-base-content/70 mb-8">
              Want to see the latest and most popular posts from users around
              the world? Join us!
            </p>
          </div>

          <Link
            className="btn btn-primary btn-lg mt-6"
            href="/auth/signup">
            Signup
          </Link>
        </div>
      </section>
    </>
  );
}
