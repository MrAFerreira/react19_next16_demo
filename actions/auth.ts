"use server";
// Server actions para autenticação
import {
  SignupFormSchema,
  SignupFormState,
  LoginFormState,
  LoginFormSchema,
} from "@/lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signup(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      },
    });
  } catch (error) {
    return {
      message: "Signup failed. Please check your credentials and try again.",
    };
  }
  redirect("/");
}

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Login failed. Please check your credentials and try again.",
      success: false,
    };
  }
  revalidatePath("/");
  redirect("/");
}

export async function signout() {
  await auth.api.signOut({
    headers: await headers(),
  });
}

export async function getUserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}
