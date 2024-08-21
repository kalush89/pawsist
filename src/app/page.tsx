import LoginForm from "@/components/LoginForm";
import LoginGoogle from "@/components/LoginGoogle";
import LoginFacebook from "@/components/LoginFacebook";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row justify-between items-center mt-10 px-4 sm:px-6 md:px-8 lg:px-0">
  <div className="card w-full max-w-lg flex justify-center lg:w-[410px]">
    <section className="flex flex-col w-full px-4 sm:px-6 md:px-8 lg:w-[400px]">
      <div className="flex flex-col lg:flex-row justify-between mt-5 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-3xl text-left">
          Sign in
        </h1>
        <Link className="text-sm sm:text-base lg:text-base text-right mt-2 lg:mt-0" href="register">
          I don't have an account
        </Link>
      </div>
      <LoginForm />
      <LoginGoogle />
      <LoginFacebook />
    </section>
  </div>
  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-gray-800 mt-8 lg:mt-0">
    Pawsist
  </div>
</main>
  );
}
