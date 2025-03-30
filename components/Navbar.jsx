import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='w-full flex justify-between items-center h-[80px]'>
      <div className='text-2xl font-bold'>
        <Link href='/'>⚡</Link>
      </div>
      <div className='space-x-10'>
        <Popover>
          <PopoverTrigger className='text-gray-700 hover:text-black'>
            Historical
          </PopoverTrigger>
          <PopoverContent className='w-fit px-[12px] py-[10px]'>
            <div className='flex flex-row items-center justify-between gap-[10px]'>
              <Link
                href='/historical'
                className='text-gray-700 hover:text-black hover:bg-gray-100 transition-all px-[12px] py-[6px] rounded-lg'
              >
                Graph
              </Link>

              <Link
                href='/map'
                className='text-gray-700 hover:text-black hover:bg-gray-100 transition-all px-[12px] py-[6px] rounded-lg'
              >
                Map
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        <Link href='/predicted' className='text-gray-700 hover:text-black'>
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
