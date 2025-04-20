import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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

const User = ({ img, linkedin, name }) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className='border-dashed border border-black/10 relative p-[20px] w-fit'>
              <Icon className='absolute h-6 w-6 -top-3 -left-3 text-gray-600' />
              <Icon className='absolute h-6 w-6 -bottom-3 -left-3 text-gray-600' />
              <Icon className='absolute h-6 w-6 -top-3 -right-3 text-gray-600' />
              <Icon className='absolute h-6 w-6 -bottom-3 -right-3 text-gray-600' />

              <Link href={linkedin} target='_blank'>
                <Image
                  src={img}
                  height={150}
                  width={150}
                  className='rounded-full'
                />
              </Link>
            </div>

            <Badge className='rounded-full bg-white text-black cursor-default mt-[10px]'>
              {name}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default User;
