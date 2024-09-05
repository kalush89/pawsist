"use client"; // Specifies that the component should run on the client-side

import React, { FormEvent, useState } from "react";
import Button from "./Button"; // Import a reusable Button component
import verifyEmail from "@/actions/verifyEmail";
import { useRouter } from "next/navigation"; // Next.js hook for router navigation

interface Props {
    email: string;
}

const VerificationForm: React.FC<Props> = ({email}) => {
  // State variables for handling form data and errors
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Next.js router for page navigation
  

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    let valid = true;

    if (!verificationCode) {
      setCodeError("Verification code is required"); // Set error if code is empty
      valid = false;
    } else {
      setCodeError(""); // Clear error if code is not empty
    }

    if (valid) {
      setIsLoading(true); // Set loading state while processing
      try {
        // Call your API to verify the code here
        const response = await verifyEmail(email, verificationCode)

        if (response.status === 400) {
          // Handle errors returned from API
          setVerificationError(response.message);
        } else {
          // Redirect to dashboard on successful verification
          router.replace("/dashboard");
          router.refresh();
        }
      } catch (error) {
        console.log(error); // Log any unexpected errors
        setVerificationError("An unexpected error occurred."); // Show generic error message
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    }
  };

  return (
    <div className="grid place-items-center">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        {/* Display verification error message if any */}
        {verificationError && (
          <p className="text-red-500 text-sm mt-1">{verificationError}</p>
        )}
        
        {/* Verification Code Input Field */}
        <div className="relative">
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
          />
          <label
            htmlFor="verificationCode"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Verification Code
          </label>
          {/* Display input error if any */}
          {codeError && (
            <p className="text-red-500 text-sm mt-1">{codeError}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <Button label={"Verify"} isLoading={isLoading} /> {/* Button component with loading state */}
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;