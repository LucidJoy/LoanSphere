import React, { useEffect, useState, useContext } from "react";
import Navbar from "@/components/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { anushka, archit, joy, nikhil, tarun } from "@/assets";
import Link from "next/link";
import User from "@/components/User";

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className={className}
      {...rest}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
    </svg>
  );
};

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      <div className='w-full h-full py-6 flex flex-row items-center justify-between'>
        <h1 className='text-[55px] font-normal text-gray-900 leading-tight font-coro'>
          About Us
        </h1>
      </div>

      <div className='flex flex-row items-center gap-[160px] w-full'>
        <div className='text-gray-600 text-[16px]'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem ex, dolore dolorum qui dignissimos sint, reiciendis
          cupiditate, illo provident reprehenderit inventore. At quisquam
          voluptate alias fugit harum exercitationem architecto quae,
          necessitatibus debitis veniam eligendi iure consectetur delectus
          minima magnam eveniet assumenda. Quos at eligendi consequuntur minima
          explicabo impedit placeat officia totam eius aliquid, beatae sint quae
          perferendis earum fugit obcaecati nostrum ut enim! Impedit dicta, nam
          soluta deserunt consequuntur ipsam tempora mollitia ea? Sit a odio
          dolore facere, atque impedit perspiciatis quas tempore iste doloribus,
          corporis similique amet hic praesentium pariatur eligendi modi ducimus
          dolor velit. Possimus tenetur, laudantium quasi laboriosam unde ipsam
          iure sapiente odit temporibus aspernatur distinctio dolore labore
          neque, consectetur corporis assumenda atque. Omnis est quod
          dignissimos ullam accusamus nisi ut, itaque, natus, rerum blanditiis
          quaerat cum ea at distinctio minus voluptas quas veritatis optio dolor
          sunt soluta laborum? Doloribus vitae dolore dignissimos, adipisci
          accusantium sequi debitis.
        </div>
      </div>

      {/* <div className='w-full h-full flex flex-row items-center justify-between py-[30px]'>
        <h1
          className='text-[55px] font-normal text-gray-900 leading-tight font-coro'
          onClick={() => predictDecision()}
        >
          Team
        </h1>
      </div> */}

      <div className='w-[90%] py-[50px]'>
        <div className='flex gap-[40px] items-center justify-between flex-wrap mt-[40px]'>
          <User linkedin={"https://www.linkedin.com/in/lucidjoy/"} img={joy} />
          <User
            linkedin={"https://www.linkedin.com/in/nikhiljk02/"}
            img={nikhil}
          />
          <User
            linkedin={"https://www.linkedin.com/in/archit-shukla06/"}
            img={archit}
          />
          <User
            linkedin={"https://www.linkedin.com/in/tarun-kumar-n-796376219/"}
            img={tarun}
          />
          <User
            linkedin={"https://www.linkedin.com/in/anushka-usingh/"}
            img={anushka}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
