// Este ficheiro serve apenas para definir tipos e esquemas Zod para validação de forms

import { User } from "better-auth";
import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Name must be at least 3 characters long" })
    .trim(),
  email: z.email({ error: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { error: "At least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { error: "At least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export const UpdateUsernameSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Name must be at least 3 characters long" })
    .trim(),
});

type BaseFormState<TErrors> =
  | {
      errors?: TErrors;
      message?: string;
    }
  | undefined
  | null;

type SignupErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
};

type LoginErrors = Omit<SignupErrors, "name">;

type UpdateUsernameErrors = Omit<SignupErrors, "email" | "password">;

export type UserProfileInfo = {
  id: string;
  name: string;
  email: string;
} | null;

export type SignupFormState = BaseFormState<SignupErrors>;
export type LoginFormState = BaseFormState<LoginErrors>;
export type UpdateUsernameState = BaseFormState<UpdateUsernameErrors>;

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  content: z.string().min(1, { message: "Content is required" }).trim(),
  published: z.boolean(),
});

export const EditPostSchema = z.object({
  postId: z.string(),
  title: z.string().min(1, { message: "Title is required" }).trim(),
  content: z.string().min(1, { message: "Content is required" }).trim(),
  published: z.boolean(),
});

type CreatePostErrors = {
  title?: string[];
  content?: string[];
};

export type CreatePostFormState = BaseFormState<CreatePostErrors>;

export const CreateCommentSchema = z.object({
  content: z.string().min(3, { message: "Content is required" }).trim(),
  postId: z.string(),
});

type CreateCommentErrors = {
  content?: string[];
  postId?: string[];
};

export type CreateCommentFormState = BaseFormState<CreateCommentErrors>;

export type CommentWithAuthor = Comment & {
  author: Pick<User, "name">;
};
