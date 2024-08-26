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
    <div className="flex sm:flex-row justify-between items-start sm:items-center mt-5 mb-5">
          <h2 className="text-xl sm:text-2xl lg:text-2xl text-left">
          Sign in
        </h2>
        <Link className="text-sm sm:text-base lg:text-base text-right mt-2 lg:mt-0" href="register">
          I don't have an account
        </Link>
      </div>
      <LoginForm />
      <Link className="text-sm sm:text-base lg:text-base text-right mt-2 lg:mt-2" href="pw-reset-email">Forgot password?</Link>
      <LoginGoogle label="Login with Google" />
      <LoginFacebook label="Login with Facebook"/>
    </section>
  </div>
  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-gray-800 mt-8 lg:mt-0">
    Pawsist
  </div>
</main>
  );
}
