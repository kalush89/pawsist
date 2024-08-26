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
          return { error: "Empty fields" };
        }

        const email = credentials.email as string;


        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return { error: "Invalid login credentials." }; 

        // Check if the password matches
        const isMatch = await bcrypt.compareSync(credentials.password as string, user.hashedPassword);
        if (!isMatch) return { error: "Invalid login credentials." }; 

        return user;
      },
    }),
  ],
  // callbacks: {
  //   async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
  //     // Log URLs to debug
  //     console.log('Redirect URL:', url);
  //     console.log('Base URL:', baseUrl);

  //     try {
  //       // Allow relative callback URLs
  //       if (url.startsWith("/")) {
  //         return `${baseUrl}${url}`;
  //       }

  //       // Allow callback URLs on the same origin
  //       const parsedUrl = new URL(url);
  //       if (parsedUrl.origin === baseUrl) {
  //         return url;
  //       }
  //     } catch (error) {
  //       console.error('Invalid URL encountered:', error);
  //     }

  //     return baseUrl;
  //   },
  // }
})