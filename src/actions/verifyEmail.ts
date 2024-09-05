'use server'
import { db } from "@/db"; // Import your database instance

export default async function verifyEmail(emailId: string, verificationCode: string) {
  try {
    // Retrieve user with matching email from the database
    const user = await db.user.findUnique({
      where: { email: emailId }, // Use colon for key-value pairs in the object
    });

    // Check if the user exists, the code matches, and the code is not expired
    if (!user || user.verificationCode !== verificationCode || user.verificationCodeExpires! < new Date()) {
      return { status: 400, message: "Invalid or expired verification code." }; // Return a response object instead of res
    }

    // Update user to mark as verified
    await db.user.update({
      where: { email: emailId }, // Corrected variable name to emailId
      data: {
        emailVerified: new Date(Date.now()),
        verificationCode: null,
        verificationCodeExpires: null,
      },
    });

    // Return a success message
    return { status: 200, message: "Email verified successfully." };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { status: 500, message: "An error occurred while verifying the email." }; // Catch and return any error that occurs
  }
}