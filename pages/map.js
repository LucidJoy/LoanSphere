import Navbar from "@/components/Navbar";
import React, { useContext, useEffect, useState, useRef } from "react";
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
import Button from "@/components/Button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const MapPage = () => {
  const {
    regions,
    usaState,
    setRegionLoader,
    setRegions,
    selectedRegion,
    houseType,
    startDate,
    endDate,
    setGraphPoints,
  } = useContext(MortgageContext);

  const [markerAvgPrice, setMarkerAvgPrice] = useState(null);
  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const mapRef = useRef(null);
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

  const handleGetAvgPrice = async () => {
    try {
      await axios.get("/api/check-limit");

      const res = await axios.get(
        `https://gage-app-ggvzu.ondigitalocean.app/get-historical-data/?region_state=${usaState}&region_name=${selectedRegion}&housing_type=${houseType}&start_date=${
          startDate.toISOString().split("T")[0]
        }&end_date=${endDate.toISOString().split("T")[0]}`
      );

      // geocoding
      const placeData = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${selectedRegion}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      );

      const [lng, lat] = placeData.data.features[0].geometry.coordinates;
      setMapLng(lng);
      setMapLat(lat);

      // move the map view
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          duration: 1000,
        });
      }

      if (placeData && res.data.avg_price) {
        setMarkerAvgPrice(res.data.avg_price);
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast("Error: Too many requests, try again later.");
      } else {
        toast(`Area not geocoded.`, { description: "Try different region." });
      }
    }
  };

  const handleViewGraph = async () => {
    try {
      await axios.get("/api/check-limit");

      const res = await axios.get(
        `https://gage-app-ggvzu.ondigitalocean.app/get-historical-data/?region_state=${usaState}&region_name=${selectedRegion}&housing_type=${houseType}&start_date=${
          startDate.toISOString().split("T")[0]
        }&end_date=${endDate.toISOString().split("T")[0]}`
      );

      if (res.data.data) {
        setGraphPoints(res.data.data);
        router.push("/price-graph");
      }

      toast("Displaying graph...");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast("Error: Too many requests, try again later.");
      } else {
        toast(`Get Prices Error: ${error}`);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      <div className='w-full h-full py-6 flex flex-row items-center justify-between'>
        <h1 className='text-[55px] font-normal text-gray-900 leading-tight font-coro'>
          Historical Map
        </h1>

        <div className='flex flex-row items-center justify-center gap-[20px]'>
          <Button
            text='View Graph'
            onClick={handleViewGraph}
            disabled={
              !usaState || !regions || !startDate || !endDate ? true : false
            }
          />
          <Button text='Get Average Price' onClick={handleGetAvgPrice} />
        </div>
      </div>

      {/* map */}
      <div className='flex flex-row gap-[10px] w-full h-full'>
        <div className='flex-[1.5] h-full w-full'>
          <Map
            ref={mapRef}
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: -105.27869,
              latitude: 40.01816,
              zoom: 10,
            }}
            fadeDuration={10}
            mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
            style={{
              height: "70vh",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Marker longitude={mapLng} latitude={mapLat} anchor='bottom'>
              <div className='relative flex flex-col items-center'>
                {/* Price Tag */}
                <Card className='bg-[#A3000A] text-white font-normal px-2 py-1 rounded-full text-[11px] leading-[12px]'>
                  ${(markerAvgPrice / 1000000).toFixed(2)}M
                </Card>

                {/* Pointer Triangle */}
                <div className='w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-[#A3000A] mt-[-2px]'></div>
              </div>
            </Marker>
          </Map>
        </div>

        {/* sidebar */}
        <div
          className='flex-[0.5] glass h-[70vh] w-full rounded-[10px] py-[4px] flex flex-col items-center'
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
