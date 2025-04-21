// download feature
import React, { useContext, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { MortgageContext } from "@/context/MortgageContext";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const PredictedGraph = () => {
  const { regions, predictGraphData, setPredictGraphData } =
    useContext(MortgageContext);

  const router = useRouter();

  useEffect(() => {
    if (!predictGraphData?.plot) {
      router.push("/future");
    }
  }, [predictGraphData?.plot]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      {/* Heading */}
      <div className='w-full h-full py-6 flex flex-row items-center justify-between'>
        <h1 className='text-[55px] font-normal text-gray-900 leading-tight font-coro'>
          Predicted Graph
        </h1>

        <Button
          text='Download Graph'
          onClick={() => {
            const link = document.createElement("a");
            link.href = predictGraphData?.plot;
            link.download = "predicted_graph.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          disabled={!predictGraphData?.plot}
        />
      </div>

      {/* Chart */}
      <div className='w-full aspect-auto flex items-center justify-center mt-[20px]'>
        <Image
          className='min-h-[400px] rounded-[10px] shadow-lg border'
          src={predictGraphData?.plot}
          height={500}
          width={850}
          alt='graph'
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default PredictedGraph;
