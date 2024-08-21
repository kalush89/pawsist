"use client";
import { login } from "@/actions/auth";
import React from "react";
import { FaFacebook } from "react-icons/fa";

const LoginFacebook = () => {
  return (
    <div
      onClick={() => login("facebook")}
      className="w-full gap-4 hover:cursor-pointer mt-2 px-6 py-4 border border-gray-400 bg-white rounded-md flex justify-center items-center"
    >
      <FaFacebook className="text-navy-blue-shade-100" />
      <p className="text-navy-blue-shade-100">Login with Facebook</p>
    </div>
  );
};

export default LoginFacebook;