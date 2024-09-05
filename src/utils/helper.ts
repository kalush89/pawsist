'use server'
import { getUserByEmail } from "@/actions/auth";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { addHours } from "date-fns";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const saltAndHashPassword = (password: any) => {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

// Helper function to validate email format
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();  // Generates a secure 6-digit code
};

// Helper function to send the emails
export const sendAppEmail = async (emailId: string, subject: string, htmlBody: string) => {

  try {
    // Create a transporter using Mailtrap SMTP
  const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
      }
  });

  //Send the mail
  await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: emailId,
    subject: subject,
    html: htmlBody,
  });

  console.log(`Email sent to ${emailId} with subject: ${subject}`);
  } catch (error) {
    console.error(`Failed to send email to ${emailId}:`, error);
  }

}

// Send emails concerning tokens
export const sendVerificationTokenEmail = async ({
  emailId,
  htmlBody,
  token,
}: {
  emailId: string;
  htmlBody: string;
  token?: string;
}) => {
  const response = await getUserByEmail(emailId);
  
  if (response) {
    // Send the email
    await sendAppEmail(emailId, "Hello ✔", htmlBody);

    // Save token in the database
    await db.verificationToken.create({
      data: {
        identifier: emailId,  // User's email
        token: token as string,
        expires: addHours(new Date(), 1),  // Token expires in 1 hour
      },
    });

  } else {
    console.log('User not found in your db');
    return false;
  }

  return true;
};