import RegisterForm from "@/components/RegisterForm";
import LoginGoogle from "@/components/LoginGoogle";
import LoginFacebook from "@/components/LoginFacebook";
import React from "react";

const RegisterUser = () => {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Register</h1>
        <RegisterForm />
        <LoginGoogle />
        <LoginFacebook />
      </section>
    </div>
  );
};

export default RegisterUser;