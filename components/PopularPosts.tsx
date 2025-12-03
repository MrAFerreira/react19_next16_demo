import { getMostPopularPosts } from "@/lib/posts";
import { cacheLife, cacheTag } from "next/cache";

export default async function PopularPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts-popular");
  const posts = await getMostPopularPosts();

  return (
    <aside className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-lg text-primary">Most Read</h2>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`} className="link link-hover text-base-content hover:text-primary transition-colors">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
