import InputEmailForm from "@/components/InputEmailForm";
import React from "react";
import Link from "next/link";

const PasswordReset = () => {
  return (
    <div className="flex justify-center items-center mt-10 px-4 sm:px-6 lg:px-8">
  <div className="card w-full max-w-lg flex justify-center lg:w-[410px]">
    <section className="flex flex-col w-full px-4 sm:px-5 md:px-5 lg:w-[400px]">
      <div className="flex sm:flex-row justify-between items-start sm:items-center mt-5 mb-5">
        <h2 className="text-xl sm:text-2xl lg:text-2xl text-left">
          Password Reset
        </h2>
        <Link className="text-sm sm:text-base lg:text-base text-right mt-2 sm:mt-0" href="/">
          Back to sign in
        </Link>
      </div>
      <InputEmailForm />
    </section>
  </div>
</div>
  );
};

export default PasswordReset;