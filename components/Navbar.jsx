import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='w-full flex justify-between items-center h-[80px]'>
      <div className='text-2xl font-bold'>
        <Link href='/'>⚡</Link>
      </div>
      <div className='space-x-10'>
        <Link href='/historical' className='text-gray-700 hover:text-black'>
          Historical
        </Link>
        <Link href='/predictor' className='text-gray-700 hover:text-black'>
          Predicted
        </Link>
        <Link href='#' className='text-gray-700 hover:text-black'>
          About us
        </Link>
        <Link href='#' className='text-gray-700 hover:text-black'>
          Contact
        </Link>
      </div>
      {router.pathname == "/" ? (
        <div className='space-x-4'>
          <Button text='Get Started' />
        </div>
      ) : (
        <div className='space-x-4 opacity-0'></div>
      )}
    </nav>
  );
};

export default Navbar;
