"use client";
import { login } from "@/actions/auth";
import React from "react";
import { FaFacebook } from "react-icons/fa";

interface Props {
  label: string;
}

const LoginFacebook: React.FC<Props> = ({label}) => {
  return (
    <div
      onClick={() => login("facebook")}
      className="w-full gap-4 hover:cursor-pointer mt-2 px-6 py-2 border border-gray-400 bg-white rounded-md flex justify-center items-center"
    >
      <FaFacebook className="text-navy-blue-shade-100" />
      <p className="text-navy-blue-shade-100">{label}</p>
    </div>
  );
};

export default LoginFacebook;