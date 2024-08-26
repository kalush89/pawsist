"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { saltAndHashPassword, validateEmail } from "@/utils/helper";

type UserRole = "USER" | "ADMIN"; // Define UserRole type

// Function to fetch a user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

// Function to handle login with a provider
export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
  revalidatePath("/");
};

// Function to handle logout
export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

// Function to handle registration with credentials
export const registerWithCreds = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { error: "Empty fields" };
  }

  const rawFormData = {
    name: name as string,
    email: email as string,
    password: password as string,
    role: "USER" as UserRole,
  };

  if (!validateEmail(rawFormData.email)) {
    return { error: "Invalid email format" };
  }

  const existingUser = await getUserByEmail(rawFormData.email);
  if (existingUser) {
    return { error: "User already exists" };
  }

  try {
    const hash = saltAndHashPassword(rawFormData.password);

    await db.user.create({
      data: {
        name: rawFormData.name,
        email: rawFormData.email,
        hashedPassword: hash,
        role: rawFormData.role,
      },
    });

    await signIn("credentials", { ...rawFormData, redirect: false });
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};