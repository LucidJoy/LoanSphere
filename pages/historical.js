import React, { useEffect, useState, useContext } from "react";
import Navbar from "@/components/Navbar";
import { db } from "@/database/drizzle";
import { historicalDataPrices, historicalDataRegion } from "@/database/schema";
import usaStates from "@/constants/usaStates";
import { MortgageContext } from "@/context/MortgageContext";
import { eq } from "drizzle-orm";
import StateSelect from "@/components/StateSelect";
import RegionSelect from "@/components/RegionSelect";
import HouseSelect from "@/components/HouseSelect";
import houseTypes from "@/constants/houseTypes";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";

const Historical = () => {
  const { usaState, regions, setRegions, regionLoader, setRegionLoader } =
    useContext(MortgageContext);

  // get all regions from selected state
  useEffect(() => {
    console.log("hi");
    try {
      setRegionLoader(true);
      const func = async () => {
        const api_regions = await db
          .select()
          .from(historicalDataRegion)
          .where(eq(historicalDataRegion.regionState, usaState));

        setRegions(api_regions);
      };
      func();
    } catch (error) {
      console.log(error);
      setRegionLoader(false);
    } finally {
      setRegionLoader(false);
    }
  }, [usaState]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      <div className='w-full h-full py-6'>
        <h1
          className='text-[55px] font-normal text-gray-900 leading-tight font-coro'
          onClick={() => console.log(regions)}
        >
          Historical
        </h1>
      </div>

      <div className='w-full h-full flex flex-row items-center justify-between mt-[10px]'>
        <div className='flex flex-col'>
          <StateSelect data={usaStates} />
        </div>

        <div className='flex flex-col'>
          <RegionSelect data={regions} />
        </div>

        <div className='flex flex-col'>
          <HouseSelect data={houseTypes} />
        </div>
      </div>

      <div className='w-full h-full flex flex-row items-center justify-evenly mt-[120px]'>
        <div className='flex flex-col'>
          <DatePicker label='Start Date' type='start' />
        </div>

        <div className='flex flex-col'>
          <DatePicker label='End Date' type='end' />
        </div>
      </div>

      <Button text='Predict' className='mt-[120px]' />
    </div>
  );
};

export default Historical;
