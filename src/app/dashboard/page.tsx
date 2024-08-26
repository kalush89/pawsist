"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to the login page if the user is not authenticated
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    // Show a loading state while session is being checked
    return <div>Loading...</div>;
  }

  if (!session) {
    // Optional: Return null or some placeholder content when unauthenticated
    return null;
  }

  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      <h1 className="text-3xl">Dashboard page</h1>
      <p className="text-lg">{session.user?.email}</p>
    </main>
  );
};

export default Dashboard;