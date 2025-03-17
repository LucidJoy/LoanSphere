"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function BackCard({ className }) {
  return (
    <div
      className={cn(
        "border border-black/[0.2] dark:border-white/[0.2] min-h-[200px] relative",
        className
      )}
    >
      <Icon className='absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black' />
      <Icon className='absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black' />
      <Icon className='absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black' />
      <Icon className='absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black' />
    </div>
  );
}

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
