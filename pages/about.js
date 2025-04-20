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
          We are graduate students from the University of Colorado Boulder,
          passionate about using technology to solve real-world problems. Loan
          Sphere is our collaborative project—an intelligent loan analysis and
          prediction platform designed to help users make smarter financial
          decisions. The platform offers three core features: a loan approval
          predictor, a historical mortgage rate explorer, and a future rate
          forecasting tool. The loan approval model, built using XGBoost,
          evaluates user inputs like income, loan amount, and term to deliver
          real-time approval predictions via a Flask API, deployed on Google
          Cloud Run using Docker and Artifact Registry. The historical price
          tool helps users visualize trends over time, while the forecasting
          model uses time series techniques to predict upcoming mortgage rate
          movements. Loan Sphere reflects our shared passion for machine
          learning, cloud computing, and intuitive design. It’s more than just a
          class project—it’s our step toward building data-driven tools that
          make finance more accessible and transparent.
        </div>
      </div>

      <div className='w-[90%] py-[50px]'>
        <div className='flex gap-[40px] items-center justify-between flex-wrap mt-[40px]'>
          <User
            linkedin={"https://www.linkedin.com/in/lucidjoy/"}
            img={joy}
            name={"Jyotirmoy Karmakar"}
          />
          <User
            linkedin={"https://www.linkedin.com/in/nikhiljk02/"}
            img={nikhil}
            name={"Nikhil Jaswaraj Karkera"}
          />
          <User
            linkedin={"https://www.linkedin.com/in/archit-shukla06/"}
            img={archit}
            name={"Archit Shukla"}
          />
          <User
            linkedin={"https://www.linkedin.com/in/tarun-kumar-n-796376219/"}
            img={tarun}
            name={"Tarun Kumar Nagelli"}
          />
          <User
            linkedin={"https://www.linkedin.com/in/anushka-usingh/"}
            img={anushka}
            name={"Anushka Singh"}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
