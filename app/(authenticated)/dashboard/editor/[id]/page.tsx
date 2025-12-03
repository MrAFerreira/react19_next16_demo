import DeletePostButton from "@/components/DeletePostButton";
import { PostEditForm } from "@/components/PostEditForm";
import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const initialPost = await getPostById(+id);

  if (!initialPost) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Edit Post</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <PostEditForm initialPost={initialPost} />
          <DeletePostButton postId={initialPost.id} />
        </div>
      </div>
    </div>
  );
}
