import { getUserByEmail } from "@/actions/auth";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { addHours } from "date-fns";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
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
export const sendVerificationTokenEmail = async ({ emailId }: { emailId: string }) => {
  const response = await getUserByEmail(emailId);
  if (response) {
      const token = nanoid(33);
      const htmlBody = `Click <a href="http://localhost:3000/resetUserPassword/${token}">here</a> to reset your password!`;
      await sendAppEmail(emailId, "Hello ✔", htmlBody);
  

      //save token in the database
      await db.verificationToken.create({
          data: {
              identifier: emailId!,  // User's email
              token: token,
              expires: addHours(new Date(), 1),  // Token expires in 1 hour
          },
      });

  } else {
      console.log('User no dey your db');
  }
  return true;
};