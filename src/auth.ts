import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook"
import  { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {db} from "@/db";


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
 
})