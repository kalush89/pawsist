"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { saltAndHashPassword } from "@/utils/helper";

// Define UserRole type
type UserRole = "USER" | "ADMIN"; // Update with your roles

// Function to fetch a user by email
const getUserByEmail = async (email: string) => {
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
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

// Function to handle logout
export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

// Function to handle login with credentials
export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: "USER" as UserRole,
    redirectTo: "/",
  };

  try {
    await signIn("credentials", rawFormData);
    revalidatePath("/");
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};


// Function to handle registration with credentials
export const registerWithCreds = async (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: "USER" as UserRole,
    redirectTo: "/",
  };

  // Check if the user already exists
  const existingUser = await getUserByEmail(formData.get("email") as string);
  if (existingUser) {
    return { error: "User already exists!" };
  }
  const hash = saltAndHashPassword(rawFormData.password);
  try {
    // Assuming you have a function to create a new user in the database
    await db.user.create({
      data: {
        name: rawFormData.name as string,
        email: rawFormData.email as string,
        hashedPassword: hash,
        role: rawFormData.role,
      },
    });

    // Automatically log in the user after registration
    await signIn("credentials", rawFormData);
    revalidatePath("/");
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};