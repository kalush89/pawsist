import React from "react";
import { useFormStatus } from "react-dom";


// Define the props interface
interface AuthButtonProps {
  label: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ label }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {pending ? "Loading..." : label}
    </button>
  );
};

export default AuthButton;