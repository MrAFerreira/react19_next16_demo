// Este ficheiro contém funções de fetch para posts e comentários
import { Comment, Post } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
export interface PostView {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  createdAt: Date;
}
export type PostInfo = Pick<PostView, "id" | "title" | "createdAt">;
export type PostInfoWithLikes = PostInfo & { likes: number };
export type CommentWithAuthor = Comment & { author: { name: string } };

export async function getAllPosts(): Promise<PostView[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt:
      post.content.length > 100
        ? post.content.slice(0, 100) + "..."
        : post.content,
    createdAt: post.createdAt,
  }));
}

export async function getLatestPosts(limit: number): Promise<PostInfo[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    createdAt: post.createdAt,
  }));
}

export async function getMostPopularPosts(
  limit: number = 3
): Promise<PostInfoWithLikes[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: limit,
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    createdAt: post.createdAt,
    likes: post._count.likes,
  }));
}

export async function getPostsByQuery(query: string) {
  const posts = await prisma.post.findMany({
    where: {
      title: { contains: query },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt:
      post.content.length > 100
        ? post.content.slice(0, 100) + "..."
        : post.content,
    createdAt: post.createdAt,
  }));
}

export async function getPostById(id: number): Promise<Post | null> {
  "use cache";
  cacheTag(`post-${id}`);
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    return null;
  }

  return post;
}

export async function getPostByIdWithLikes(
  id: number,
  userId: string
): Promise<(PostView & { liked?: boolean }) | null> {
  "use cache";
  cacheTag(`post-${id}`);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      likes: {
        where: { userId },
        select: { id: true },
      },
    },
  });
  if (!post) {
    return null;
  }

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt:
      post.content.length > 100
        ? post.content.slice(0, 100) + "..."
        : post.content,
    createdAt: post.createdAt,
    liked: post.likes.length > 0,
  };
}

export async function getAuthorPosts(authorId: string): Promise<PostInfo[]> {
  const posts = await prisma.post.findMany({
    where: {
      authorId,
      published: true,
    },
    select: { id: true, title: true, createdAt: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function getAuthorDrafts(authorId: string): Promise<PostInfo[]> {
  const posts = await prisma.post.findMany({
    where: {
      authorId,
      published: false,
    },
    select: { id: true, title: true, createdAt: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function getRelatedPostsFromAuthor(
  postId: number
): Promise<PostInfo[]> {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      author: {
        posts: {
          some: {
            id: postId,
          },
        },
      },
      NOT: {
        id: postId,
      },
    },
    select: { id: true, title: true, createdAt: true },
  });
  // WARNING: Este delay serve apenas para demonstração
  await new Promise(resolve => setTimeout(resolve, 2000));
  return posts;
}
export async function getPostComments(
  postId: number
): Promise<CommentWithAuthor[]> {
  //para ser usado no futuro
  //"use cache";
  //cacheTag(`post-${postId}-comments`);
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  // WARNING: Este delay serve apenas para demonstração
  await new Promise(resolve => setTimeout(resolve, 5000));

  return comments || [];
}

export async function getLatestComments(
  limit: number
): Promise<(CommentWithAuthor & { post: { id: number; title: string } })[]> {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      author: {
        select: { name: true },
      },
      post: {
        select: { id: true, title: true },
      },
    },
  });
  return comments || [];
}
