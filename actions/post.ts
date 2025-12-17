// Este ficheiro contém as server actions relacionadas com posts e comentários
"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import { headers } from "next/headers";
import {
  CreatePostSchema,
  CreatePostFormState,
  CreateCommentSchema,
  CreateCommentFormState,
  EditPostSchema,
} from "@/lib/definitions";
import { redirect } from "next/navigation";

export async function createPost(
  state: CreatePostFormState,
  formData: FormData
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      message: "You must be signed in to create a post.",
    };
  }

  const validated = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    published: Boolean(formData.get("published")),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { title, content, published } = validated.data;

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: session.user.id,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Error creating post. Please try again.",
    };
  }

  revalidateTag("posts-latest", "max");
  redirect("/");
}

export async function editPost(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      message: "You must be signed in to create a post.",
    };
  }

  const validated = EditPostSchema.safeParse({
    postId: formData.get("postId"),
    title: formData.get("title"),
    content: formData.get("content"),
    published: Boolean(formData.get("published")),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { title, content, published, postId } = validated.data;

  const existingPost = await prisma.post.findUnique({
    where: { id: +postId },
  });

  if (existingPost?.authorId !== session.user.id) {
    return {
      message: "You are not authorized to edit this post.",
    };
  }

  try {
    await prisma.post.update({
      where: { id: +postId },
      data: {
        title,
        content,
        published,
        authorId: session.user.id,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Error creating post. Please try again.",
    };
  }
  updateTag(`post-${postId}`);
  redirect(`/posts/${postId}`);
}

export async function deletePost(postId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      success: false,
      message: "You must be signed in to like a post.",
    };
  }
  if (!postId) {
    return {
      success: false,
      message: "Post ID is required.",
    };
  }
  const existing = await prisma.post.findFirst({
    where: { id: postId, authorId: session.user.id },
  });

  if (existing) {
    await prisma.post.delete({
      where: { id: postId },
    });
    return {
      success: true,
      message: "Post deleted successfully.",
    };
  } else {
    return {
      success: false,
      message: "Failed to delete the post",
    };
  }
}

export async function likePost(postId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      success: false,
      liked: false,
      message: "You must be signed in to like a post.",
    };
  }

  if (!postId) {
    return {
      success: false,
      liked: false,
      message: "Post ID is required.",
    };
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const existing = await prisma.like.findFirst({
      where: { postId, userId: session.user.id },
    });

    if (existing) {
      await prisma.like.deleteMany({
        where: { postId, userId: session.user.id },
      });
      return { success: true, liked: false };
    }

    await prisma.like.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
    return { success: true, liked: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      liked: false,
      message: "Error updating like. Please try again.",
    };
  }
}

export async function addComent(formData: FormData) {
  // Validação server side
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      message: "You must be signed in to comment a post",
    };
  }

  const validated = CreateCommentSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { content, postId } = validated.data;
  const authorId = session.user.id;

  try {
    await prisma.comment.create({
      data: {
        postId: +postId,
        authorId,
        content,
      },
    });

    updateTag(`post-${+postId}-comments`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error commenting.Please try again.",
    };
  }
}

// Semelhante à função acima mas com types
export async function createComment(
  state: CreateCommentFormState,
  formData: FormData
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      message: "You must be signed in to comment a post",
    };
  }
  const validated = CreateCommentSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { content, postId } = validated.data;
  const authorId = session.user.id;
  try {
    await prisma.comment.create({
      data: {
        postId: +postId,
        authorId,
        content,
      },
    });

    updateTag(`post-${+postId}-comments`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error commenting.Please try again.",
    };
  }
}
