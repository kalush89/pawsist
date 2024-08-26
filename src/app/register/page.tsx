import RegisterForm from "@/components/RegisterForm";
import LoginGoogle from "@/components/LoginGoogle";
import LoginFacebook from "@/components/LoginFacebook";
import React from "react";
import Link from "next/link";

const RegisterUser = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card w-[450px] flex justify-center">
        <section className="flex flex-col w-[400px]">
        <div className="flex flex-col lg:flex-row justify-between mt-5 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-3xl text-left">
          Register
        </h1>
        <Link className="text-sm sm:text-base lg:text-base text-right mt-2 lg:mt-0" href="/">
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