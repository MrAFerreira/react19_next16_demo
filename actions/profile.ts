// Este ficheiro contém as server actions relacionadas com o perfil do utilizador

"use server";
import { auth } from "@/lib/auth";
import {
  UpdateUsernameSchema,
  UpdateUsernameState,
  UserProfileInfo,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateUsername(
  state: UpdateUsernameState,
  formData: FormData
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }
  const validatedFields = UpdateUsernameSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name } = validatedFields.data;
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Erro changing username",
    };
  }
  revalidatePath("/profile");
}

export async function getUserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  const userInfo: UserProfileInfo = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
  return userInfo;
}
