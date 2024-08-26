"use client";
import React, { FormEvent, useState } from "react";
import Button from "./Button";

const PREmailForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setFormMessage("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      // Make an API request to send the password reset link (replace with your actual API call)
      const response = await fetch("/api/send-reset-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setFormMessage("If there's a Pawsist account connected to this email address, we’ll email you password reset instructions. If you don’t receive the email, please try again and make sure you enter the email address associated with your account.");
      } else {
        // Handle specific error messages based on the response if needed
        setFormMessage("If there's a Pawsist account connected to this email address, we’ll email you password reset instructions. If you don’t receive the email, please try again and make sure you enter the email address associated with your account.");
      }
    } catch (error) {
      console.error(error);
      setFormMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        {formMessage && (
          <p className="text-green-500 text-sm mt-1">{formMessage}</p>
        )}
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
        <div className="mt-2">
          <Button label={"Send Reset Link"} isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default PREmailForm;