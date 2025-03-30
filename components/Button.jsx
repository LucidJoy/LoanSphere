import React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const Button = ({ text, className, onClick, disabled, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loader2
          className='animate-spin relative cursor-not-allowed'
          height={24}
          width={24}
          stroke='black'
        />
      ) : (
        <button
          className={cn(
            "relative bg-black text-white px-6 py-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 disabled:hover:scale-100 disabled:cursor-not-allowed",
            className
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
