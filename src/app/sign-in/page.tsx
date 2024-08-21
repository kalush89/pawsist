import LoginForm from "@/components/LoginForm";
import LoginGoogle from "@/components/LoginGoogle";
import LoginFacebook from "@/components/LoginFacebook";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card w-[450px] flex justify-center">
        <section className="flex flex-col w-[400px]">
          <div className="flex flex-row justify-between mt-5 mb-5">
            <h1 className="text-3xl text-left ">Sign in</h1>
            <a className="text-right" href="#">I don't have an account</a>
          </div>
          <LoginForm />
          <LoginGoogle />
          <LoginFacebook />
        </section>
      </div>
    </div>
  );
};

export default SignIn;