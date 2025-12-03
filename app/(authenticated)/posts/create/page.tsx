import { PostForm } from "@/components/PostForm";

export default function CreatePostPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Create New Post</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <PostForm />
        </div>
      </div>
    </div>
  );
}
