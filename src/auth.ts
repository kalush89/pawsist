import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import  { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {db} from "@/db";


interface ExtendedUser extends User {
  id: string; // Ensure we have the id property
  emailVerified: Date | null; // Extend the type to include emailVerified
}

export const { 
    handlers, 
    signIn, 
    signOut, 
    auth,
} = NextAuth({
  debug: true,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
  providers: [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
        clientId: process.env.AUTH_FACEBOOK_ID,
        clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: " ",
        },
        password: { label: "Password", type: "password", placeholder: " " },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;


        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null; 
        } 

        // Check if the password matches
        const isMatch = await bcrypt.compare(credentials.password as string, user.hashedPassword);
        if (!isMatch) {
          return null;
        } 

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Type guard to ensure user is an ExtendedUser
      const extendedUser = user as ExtendedUser;

      if ((account?.provider === "google" || account?.provider === "facebook") && extendedUser.emailVerified === null) {
        // Update emailVerified field if null
        await db.user.update({
          where: { id: extendedUser.id },
          data: { emailVerified: new Date() },
        });
      }

      return true;
    },
  },
});