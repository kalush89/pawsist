import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
