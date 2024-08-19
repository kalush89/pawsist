"use client";
import React from "react";
import AuthButton from "./AuthButton";
import { registerWithCreds } from "@/actions/auth";

const RegisterForm = () => {
  return (
    <div>
      <form action={registerWithCreds} className="w-full flex flex-col gap-4">
      <div>
          <label className="block text-sm font-medium text-gray-200">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            id="Name"
            name="name"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton label={"Agree & Register"} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;