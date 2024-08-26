"use client";
import { login } from "@/actions/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";
interface Props {
  label: string;
}
const LoginGoogle: React.FC<Props> = ({label}) => {
  return (
    <div
      onClick={() => login("google")}
      className=" w-full gap-4 hover:cursor-pointer mt-6 px-6 py-2 border border-gray-400 bg-white rounded-md p-4 flex justify-center items-center"
    >
      <FaGoogle className="text-navy-blue-shade-100" />
      <p className="text-navy-blue-shade-100">{label}</p>
    </div>
  );
};

export default LoginGoogle;