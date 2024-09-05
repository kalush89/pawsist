"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { generateVerificationCode, saltAndHashPassword, sendAppEmail, validateEmail } from "@/utils/helper";
import crypto from "crypto";

// Define the type for user roles, either "USER" or "ADMIN"
type UserRole = "USER" | "ADMIN"; 

// Function to fetch a user by their email from the database
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email, // Find user with matching email
      },
    });
    return user; // Return the user if found
  } catch (error) {
    console.error("Error fetching user by email:", error); // Log error if fetching fails
    return null; // Return null if there was an error
  }
};

// Function to handle user login with a specific provider (e.g., Google, Facebook)
export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" }); // Sign in with the specified provider and redirect to dashboard
  revalidatePath("/"); // Revalidate the cache for the home path
};

// Function to handle user logout
export const logout = async () => {
  await signOut({ redirectTo: "/" }); // Sign out the user and redirect to the home page
  revalidatePath("/"); // Revalidate the cache for the home path
};

// Function to handle user registration with credentials (name, email, password)
export const registerWithCreds = async (formData: FormData) => {
  const name = formData.get("name"); // Get the user's name from the form data
  const email = formData.get("email"); // Get the user's email from the form data
  const password = formData.get("password"); // Get the user's password from the form data

  // If any of the fields are missing, return an error
  if (!name || !email || !password) {
    return { error: "Empty fields" };
  }

  // Prepare the raw form data with appropriate types
  const rawFormData = {
    name: name as string,
    email: email as string,
    password: password as string,
    role: "USER" as UserRole, // Default role is set to "USER"
  };

  // Validate the email format
  if (!validateEmail(rawFormData.email)) {
    return { error: "Invalid email format" }; // Return an error if the email format is invalid
  }

  // Check if a user with the same email already exists
  const existingUser = await getUserByEmail(rawFormData.email);
  if (existingUser) {
    return { error: "User already exists" }; // Return an error if the user already exists
  }

  try {
    // Hash the password for security
    const hash = await saltAndHashPassword(rawFormData.password);

    // Generate a verification code for email verification
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Prepare the HTML content for the verification email
    const htmlBody = `<p>Your verification code is: <b>${verificationCode}</b></p>`;
  
    // Save the new user to the database with hashed password and verification details
    await db.user.create({
      data: {
        name: rawFormData.name,
        email: rawFormData.email,
        hashedPassword: hash,
        role: rawFormData.role,
        verificationCode, // Save the generated verification code
        verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000), // Set verification code expiry to 15 minutes
      },
    });

    // Send the verification email to the user
    await sendAppEmail(rawFormData.email, "Your Verification Code", htmlBody);
  
    // Sign in the user with the provided credentials (without redirect)
    await signIn("credentials", { ...rawFormData, redirect: false });
    return { success: true }; // Return success if everything went well
  } catch (error: any) {
    console.log(error); // Log any errors that occur during registration
    return { error: "Something went wrong" }; // Return a generic error message
  }
};