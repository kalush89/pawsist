import LoginForm from "@/components/LoginForm";
import LoginGoogle from "@/components/LoginGoogle";
import LoginFacebook from "@/components/LoginFacebook";
import React from "react";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card w-[450px] flex justify-center">
        <section className="flex flex-col w-[400px]">
          <div className="flex flex-row justify-between mt-5 mb-5">
            <h1 className="text-xl sm:text-2xl lg:text-2xl text-left">Sign in</h1>
            <Link className="text-right" href="#">I don't have an account</Link>
          </div>
          <LoginForm />
          <Link className="text-right" href="/components/PREmailForm">Forgot password?</Link>
          <LoginGoogle label="Sign in with Google" />
          <LoginFacebook label="Sign in with Facebook" />
        </section>
      </div>
    </div>
  );
};

export default SignIn;