import RegisterForm from "@/components/RegisterForm";
import PREmailForm from "@/components/PREmailForm";
import React from "react";
import Link from "next/link";

const PResetEmail = () => {
  return (
    <div className="flex justify-center items-center mt-10 px-4 sm:px-6 lg:px-8">
  <div className="card w-full max-w-lg flex justify-center">
    <section className="flex flex-col w-full px-4 sm:px-6">
      <div className="flex sm:flex-row justify-between items-start sm:items-center mt-5 mb-5">
        <h2 className="text-xl sm:text-2xl lg:text-2xl text-left">
          Password Reset
        </h2>
        <Link className="text-sm sm:text-base lg:text-base text-right mt-2 sm:mt-0" href="/">
          Back to sign in
        </Link>
      </div>
      <PREmailForm />
    </section>
  </div>
</div>
  );
};

export default PResetEmail;