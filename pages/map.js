import Navbar from "@/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import StateSelect from "@/components/StateSelect";
import usaStates from "@/constants/usaStates";
import RegionSelect from "@/components/RegionSelect";
import { MortgageContext } from "@/context/MortgageContext";
import houseTypes from "@/constants/houseTypes";
import HouseSelect from "@/components/HouseSelect";
import { Separator } from "@/components/ui/separator";
import DatePicker from "@/components/DatePicker";
import { db } from "@/database/drizzle";
import { historicalDataRegion } from "@/database/schema";
import { eq } from "drizzle-orm";

const MapPage = () => {
  const { regions, usaState, setRegionLoader, setRegions } =
    useContext(MortgageContext);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      <div className='w-full h-full py-6 flex flex-row items-center justify-between'>
        <h1
          className='text-[55px] font-normal text-gray-900 leading-tight font-coro'
          onClick={() => console.log(startDate.toISOString().split("T")[0])}
        >
          Historical Map
        </h1>

        {/* <Button text='Get Prices' onClick={handleClick} /> */}
      </div>

      {/* map */}
      <div className='flex flex-row gap-[10px] w-full h-full'>
        <div className='flex-[1.5] h-full w-full'>
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: -122.2,
              latitude: 38.1,
              zoom: 10,
            }}
            mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
            style={{
              height: "70vh",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Marker longitude={-122.2} latitude={38.1} anchor='bottom'>
              <div className='relative flex flex-col items-center'>
                {/* Price Tag */}
                <Card className='bg-[#A3000A] text-white font-normal px-2 py-1 rounded-full text-[11px] leading-[12px]'>
                  $500K
                </Card>

                {/* Pointer Triangle */}
                <div className='w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-[#A3000A] mt-[-2px]'></div>
              </div>
            </Marker>
          </Map>
        </div>

        {/* sidebar */}
        <div
          className='flex-[0.5] glass h-[70vh] w-full rounded-[10px] py-[10px] -[20px] flex flex-col items-center'
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
        >
          <div className='flex flex-col items-center justify-center gap-[10px]'>
            <StateSelect data={usaStates} />

            <RegionSelect data={regions} />

            <HouseSelect data={houseTypes} />
          </div>

          <Separator className='w-[80%] bg-black mt-[20px] mb-[10px]' />

          <div className='flex flex-col items-center justify-center gap-[10px]'>
            <div className='flex flex-col '>
              <DatePicker label='Start Date' type='start' />
            </div>

            <div className='flex flex-col'>
              <DatePicker label='End Date' type='end' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
