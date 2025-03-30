import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
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
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const forecastEndpoint =
  "https://flask-api-19942824419.us-central1.run.app/forecast";

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

const Predicted = () => {
  const {
    usaState,
    regions,
    setRegions,
    setRegionLoader,
    selectedRegion,
    startDate,
    houseType,
    predictPriceLoader,
    setPredictPriceLoader,
    setPredictGraphData,
    predictionMonths,
    setPredictionMonths,
  } = useContext(MortgageContext);

  const router = useRouter();

  // get all regions from selected state
  useEffect(() => {
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

  const handlePredictGraph = async () => {
    try {
      setPredictPriceLoader(true);
      const response = await axios.post(forecastEndpoint, {
        state: usaState,
        region: selectedRegion,
        house_type: houseType,
        start_date: new Date(startDate).toISOString().slice(0, 10),
        prediction_months: +predictionMonths,
      });

      setPredictGraphData(response.data);

      setPredictPriceLoader(false);

      router.push("/predicted-graph");
    } catch (error) {
      toast(`Get Prices Error: ${error}`);
      setPredictPriceLoader(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      <div className='w-full h-full py-6 flex flex-row items-center justify-between'>
        <h1
          className='text-[55px] font-normal text-gray-900 leading-tight font-coro'
          onClick={() =>
            console.log(
              usaState,
              selectedRegion,
              houseType,
              new Date(startDate).toISOString().slice(0, 10),
              predictionMonths
            )
          }
        >
          Predicted Prices
        </h1>

        <Button
          text='Predict Prices'
          onClick={handlePredictGraph}
          isLoading={predictPriceLoader}
        />
      </div>

      <div className='flex flex-row items-center gap-[160px] w-full h-[480px]'>
        <div className='flex-1 mt-[10px] border-dashed border border-black/10 relative py-[20px] h-full'>
          <Icon className='absolute h-6 w-6 -top-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -top-3 -right-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -right-3 text-gray-600' />

          <div className='w-full h-full flex flex-col items-center justify-evenly gap-[60px] p-6'>
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
        </div>

        <div className='flex-1 mt-[10px] border-dashed border border-black/10 relative py-[20px] h-full'>
          <Icon className='absolute h-6 w-6 -top-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -top-3 -right-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -right-3 text-gray-600' />

          <div className='w-full h-full flex flex-col items-center justify-center gap-[80px]'>
            <div className='flex flex-col'>
              <DatePicker label='Start Date' type='start' />
            </div>

            <div className='flex flex-col'>
              <Label
                htmlFor='predict-months'
                className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
              >
                Prediction Months
              </Label>

              <div>
                <Input
                  type='number'
                  min={6}
                  max={12}
                  id='predict-months'
                  placeholder='Months'
                  className='w-[280px] justify-start text-left font-normal text-black bg-white/80
                  shadow-md mt-[4px] border border-neutral-200 rounded-md ring-offset-white data-[placeholder]:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950/35 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                  onChange={(e) => setPredictionMonths(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predicted;
