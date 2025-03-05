import React, { useContext } from "react";
import Link from "next/link";
import { Cover } from "@/components/ui/cover";
import { Check, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import { Separator } from "@/components/ui/separator";
import { MortgageContext } from "@/context/MortgageContext";

export default function Home() {
  const { mortgageAmount, setMortgageAmount } = useContext(MortgageContext);

  return (
    <main>
      <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12'>
        <nav className='w-full flex justify-between items-center py-6'>
          <div className='text-2xl font-bold'>⚡</div>
          <div className='space-x-10'>
            <Link href='#' className='text-gray-700 hover:text-black'>
              Historical
            </Link>
            <Link href='#' className='text-gray-700 hover:text-black'>
              Predicted
            </Link>
            <Link href='#' className='text-gray-700 hover:text-black'>
              Payment
            </Link>
            <Link href='#' className='text-gray-700 hover:text-black'>
              About us
            </Link>
            <Link href='#' className='text-gray-700 hover:text-black'>
              Contact
            </Link>
          </div>
          <div className='space-x-4'>
            <Button text='Get Started' />
          </div>
        </nav>

        <div className='flex flex-col lg:flex-row w-full max-w-6xl mt-12 lg:mt-24'>
          <div className='lg:w-1/2'>
            <h1 className='text-[55px] font-normal text-gray-900 leading-tight font-coro'>
              Search For <br /> Mortgages at <br /> <Cover>Warp Speed.</Cover>
            </h1>
            <p className='text-lg text-gray-600 mt-4'>
              Loan products and the competition new customers face <br /> is
              fierce — finding the right loan can seem difficult.
            </p>
            <div className='flex space-x-4 mt-6'>
              <Button text='Get Started' />
            </div>
            <div className='mt-[30px] flex space-x-4 text-gray-700'>
              <span className='flex items-center gap-[4px]'>
                <Check className='font-bold' /> Safe and Secure
              </span>
              <span className='flex items-center gap-[6px]'>
                <Check className='font-bold' /> No-Document Needed
              </span>
            </div>
          </div>

          <div className='lg:w-1/2 mt-12 lg:mt-0 flex flex-col items-center'>
            <h3 className='text-gray-600 font-medium flex gap-[8px] items-center'>
              <Sparkles height={18} width={18} /> Compare Mortgage Rates
            </h3>

            <div className='bg-white shadow-lg border border-black/5 p-[30px] rounded-xl mt-4 w-[360px] text-center'>
              <p className='text-gray-600 font-medium'>
                Select Mortgage Amount
              </p>
              <p className='text-4xl font-bold text-gray-900 mt-[16px] font-mono'>
                USD ${mortgageAmount}
              </p>
              <div className='relative w-full mt-4'>
                <input
                  type='range'
                  min='5000'
                  max='500000'
                  className='w-full h-2 bg-gradient-to-r from-purple-500 via-[#1D2791]/50 to-blue-500 rounded-lg appearance-none cursor-pointer focus:outline-none opacity-50'
                  style={{
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                  onChange={(e) => setMortgageAmount(e.target.value)}
                />
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 30px;
                    height: 20px;
                    background: white;
                    border: 1px solid black;
                    border-radius: 5px;
                    cursor: pointer;
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 30px;
                    height: 20px;
                    background: white;
                    border: 1px solid black;
                    border-radius: 5px;
                    cursor: pointer;
                  }
                `}</style>
              </div>
              <div className='flex justify-between text-gray-600 text-sm mt-2'>
                <span className='font-medium'>USD 5,000</span>
                <span className='font-medium'>USD 500,000</span>
              </div>
              <div className='my-[20px]'>
                <Separator />
              </div>
              <Button text='Start Now' />
              <div className='mt-[30px] text-gray-600 text-sm'>
                <p>👥 50,000+ Users</p>
                <p className='mt-[6px]'>🔒 Safe And Market-Accurate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
