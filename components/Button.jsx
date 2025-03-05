import React from "react";

const Button = ({ text }) => {
  return (
    <button className='relative bg-black text-white px-6 py-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/50'>
      {text}
    </button>
  );
};

export default Button;
