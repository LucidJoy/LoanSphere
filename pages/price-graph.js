import React, { useContext } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MortgageContext } from "@/context/MortgageContext";

// const chartData = [
//   { price_date: "2014-01-31", price: 237323.41, price_mil: 0.237 },
//   { price_date: "2014-02-28", price: 239044.46, price_mil: 0.239 },
//   { price_date: "2014-03-31", price: 240357.34, price_mil: 0.24 },
//   { price_date: "2014-04-30", price: 241536.59, price_mil: 0.241 },
//   { price_date: "2014-05-31", price: 242966.27, price_mil: 0.242 },
//   { price_date: "2014-06-30", price: 244435.94, price_mil: 0.244 },
// ];

const chartConfig = {
  historical: {
    label: "Historical Prices",
    color: "hsl(220, 100%, 50%)",
  },
  forecasted: {
    label: "Forecasted Prices",
    color: "hsl(0, 100%, 50%)",
  },
};

const PriceGraph = () => {
  const { regions, graphPoints } = useContext(MortgageContext);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      {/* Heading */}
      <div className='w-full h-full py-6'>
        <h1
          className='text-[55px] font-normal text-gray-900 leading-tight font-coro'
          onClick={() => console.log(regions)}
        >
          Price Graph
        </h1>
      </div>

      {/* Chart */}
      <div className='w-[50vw] aspect-auto'>
        <Card>
          <CardHeader>
            <CardTitle>
              Home Value Trends & Forecast for 5+ - BedRoom in Flagstaff, AZ
            </CardTitle>
            <CardDescription>April 2019 - April 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className='min-h-[400px]'>
              <LineChart
                accessibilityLayer
                data={graphPoints}
                margin={{
                  top: 20,
                  right: 30,
                  left: 30,
                  bottom: 50,
                }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey='price_date'
                  tickLine={true}
                  axisLine={true}
                  tickMargin={10}
                  angle={-45}
                  textAnchor='end'
                  height={60}
                  // label={{
                  //   value: "Average Home Value ($)",
                  //
                  //   position: "middle",
                  //   dy: 70,
                  //   style: { textAnchor: "middle" },
                  // }}
                />
                <YAxis
                  tickFormatter={(value) => `$${value.toFixed(2)}M`}
                  // domain={[0.5, 1.2]}
                  label={{
                    value: "Average Home Value ($)",
                    angle: -90,
                    position: "left",
                    dx: -10,
                    style: { textAnchor: "middle" },
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`$${value}M`, ""]}
                />
                <Line
                  dataKey='price_mil'
                  type='monotone'
                  stroke='var(--color-historical)'
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-historical)",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                  connectNulls
                />
                <Line
                  dataKey='forecasted'
                  type='monotone'
                  stroke='var(--color-forecasted)'
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-forecasted)",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                  connectNulls
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceGraph;
