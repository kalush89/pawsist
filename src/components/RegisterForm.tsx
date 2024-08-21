"use client";
import React, { FormEvent, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { getUserByEmail } from "@/actions/auth";
import { saltAndHashPassword } from "@/utils/helper";
import { db } from "@/db";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const router = useRouter();

  type UserRole = "USER" | "ADMIN"; // Define UserRole type

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    // Basic validation
    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email as string);
        if (existingUser) {
          setRegistrationError("User already exists!");
          return;
        }

        // Hash the password
        const hashedPassword = saltAndHashPassword(password);

        // Create the new user
        const user = await db.user.create({
          data: {
            name,
            email,
            hashedPassword,
            role: "USER" as UserRole,
          },
        });

        if (!user) {
          setRegistrationError("Something went wrong during registration!");
          return;
        }

        // Sign in the user after registration
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResult?.error) {
          setRegistrationError("Wrong Email or Password!");
        } else {
          router.replace("/dashboard"); // Redirect to dashboard on success
          router.refresh(); // Refresh the page to reflect the login state
        }
      } catch (error) {
        console.log(error);
        setRegistrationError("An unexpected error occurred!");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        {registrationError && (
          <p className="text-red-500 text-sm mt-1">{registrationError}</p>
        )}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
          />
          <label
            htmlFor="name"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Name
          </label>
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
          />
          <label
            htmlFor="email"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Email
          </label>
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
          />
          <label
            htmlFor="password"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Password
          </label>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
<p className="text-xs my-1">By signing up, you agree to the Terms and Conditions and Privacy Policy. California residents, see our CA Privacy Notice.</p>
        <div className="mt-2">
          <Button label={"Agree and Register"} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;