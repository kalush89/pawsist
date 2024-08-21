import React from "react";
import { useFormStatus } from "react-dom";

// Define the props interface
interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`btn btn-large-full btn-navy ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {pending ? "Loading..." : label}
    </button>
  );
};

export default Button;