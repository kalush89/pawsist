"use client";
import React, { FormEvent, useState } from "react";
import { updatePassword } from "@/actions/updatePassword";
import Button from "./Button";
import { useRouter } from "next/navigation"; // Import useRouter

interface Props {
  tokenFromUrl: string;
}

const PasswordResetForm: React.FC<Props> = ({ tokenFromUrl }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [resetError, setResetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    // Validate new password
    if (!newPassword) {
      setPasswordError("New password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Validate repeat password
    if (!repeatPassword) {
      setRepeatPasswordError("A password repeat is required");
      valid = false;
    } else if (newPassword !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      valid = false;
    } else {
      setRepeatPasswordError("");
    }

    if (valid) {
      setIsLoading(true);
      try {
        const isUpdated = await updatePassword({ newPassword }, { tokenFromUrl });

        if (isUpdated.success) {
          router.push("/");
        } else {
          setResetError(isUpdated.error!);
        }
      } catch (error) {
        console.error(error);
        setResetError("An unexpected error occurred.");
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    }
  };

  return (
    <div className="grid place-items-center">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        {resetError && <p className="text-red-500 text-sm mt-1">{resetError}</p>}
        
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
          />
          <label
            htmlFor="password"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            New Password
          </label>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div className="relative">
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
          />
          <label
            htmlFor="repeatPassword"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Repeat New Password
          </label>
          {repeatPasswordError && (
            <p className="text-red-500 text-sm mt-1">{repeatPasswordError}</p>
          )}
        </div>
        
        <div className="mt-2">
          <Button label={"Reset"} isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;