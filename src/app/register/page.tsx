import RegisterForm from "@/components/RegisterForm";
import LoginGoogle from "@/components/LoginGoogle";
import LoginFacebook from "@/components/LoginFacebook";
import React from "react";
import Link from "next/link";

const RegisterUser = () => {
  return (
    <div className="flex justify-center items-center mt-10 px-4 sm:px-6 lg:px-8">
    <div className="card w-full max-w-lg flex justify-center">
      <section className="flex flex-col w-full px-4 sm:px-6">
        <div className="flex sm:flex-row justify-between items-start sm:items-center mt-5 mb-5">
          <h2 className="text-xl sm:text-2xl lg:text-2xl text-left">
            Register
          </h2>
          <Link className="text-sm sm:text-base lg:text-base text-right mt-2 sm:mt-0" href="/">
          I have an account
        </Link>
        </div>
        <RegisterForm />
        <LoginGoogle label="Register with Google"/>
        <LoginFacebook label="Register with Facebook"/>
        <p className="text-xs my-1">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
You also agree to receive product-related marketing emails from Grammarly, which you can unsubscribe from at any time.</p>
      </section>
    </div>
    </div>
  );
};

export default RegisterUser;