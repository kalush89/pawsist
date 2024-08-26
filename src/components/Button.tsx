import React from "react";
import { useFormStatus } from "react-dom";

// Define the props interface
interface ButtonProps {
  label: string;
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, isLoading }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`btn ripple btn-large-full btn-navy ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;