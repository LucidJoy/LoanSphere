import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { db } from "@/database/drizzle";
import { historicalDataPrices, historicalDataRegion } from "@/database/schema";
import usaStates from "@/constants/usaStates";
import { MortgageContext } from "@/context/MortgageContext";
import { eq } from "drizzle-orm";
import StateSelect from "@/components/StateSelect";
import Button from "@/components/Button";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import OccupancySelect from "@/components/OccupancySelect";
import DecisionDialog from "@/components/DecisionDialog";

const decisionEndpoint =
  "https://loan-predictor-669396643454.us-central1.run.app/predict";

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

const Decision = () => {
  const {
    usaState,
    setRegions,
    setRegionLoader,
    predictDecisionLoader,
    setPredictDecisionLoader,
    occType,
    loanAmount,
    setLoanAmount,
  } = useContext(MortgageContext);

  // states
  const [loanTerm, setLoanTerm] = useState(null);
  const [incomeState, setIncomeState] = useState(null);
  const [monthlyDebtState, setMonthlyDebtState] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [approvalProbability, setApprovalProbability] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

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

  const predictDecision = async () => {
    try {
      setPredictDecisionLoader(true);

      const res = await axios.post(decisionEndpoint, {
        loan_amount: +loanAmount,
        loan_term: +loanTerm,
        income: +incomeState,
        monthly_debt: +monthlyDebtState,
        occupancy_type: occType,
        loan_purpose: "Home Purchase",
        state: usaState,
      });

      setPredictionResult(res.data.prediction);
      setApprovalProbability(res.data.probability_of_approval);
      setShowDialog(true);

      console.log(res.data);

      setPredictDecisionLoader(false);
    } catch (error) {
      console.log(`Error: ${error}`);
      setPredictDecisionLoader(false);
    } finally {
      setPredictDecisionLoader(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-white to-blue-300 flex flex-col items-center px-6 sm:px-12 overflow-hidden'>
      <Navbar />

      <div className='w-full h-full py-6 flex flex-row items-center justify-between'>
        <h1 className='text-[55px] font-normal text-gray-900 leading-tight font-coro'>
          Loan Decision
        </h1>

        <Button
          text='Predict Decision'
          onClick={predictDecision}
          isLoading={predictDecisionLoader}
        />
      </div>

      <div className='flex flex-row items-center gap-[160px] w-full h-[480px]'>
        <div className='flex-1 mt-[10px] border-dashed border border-black/10 relative py-[20px] h-full'>
          <Icon className='absolute h-6 w-6 -top-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -top-3 -right-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -right-3 text-gray-600' />

          <div className='w-full h-full flex flex-col items-center justify-evenly gap-[60px] p-6'>
            {/* loan amount */}
            <div className='flex flex-col'>
              <Label
                htmlFor='loan-amount'
                className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
              >
                Loan Amount
              </Label>

              <div>
                <Input
                  type='number'
                  id='loan-amount'
                  value={loanAmount}
                  placeholder='Amount'
                  className='w-[280px] justify-start text-left font-normal text-black bg-white
                  shadow-md mt-[4px] border border-neutral-200 rounded-md ring-offset-white data-[placeholder]:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950/35 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
            </div>

            {/* loan term */}
            <div className='flex flex-col'>
              <Label
                htmlFor='loan-term'
                className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
              >
                Loan Term
              </Label>

              <div>
                <Input
                  type='number'
                  id='loan-term'
                  placeholder='Duration'
                  className='w-[280px] justify-start text-left font-normal text-black bg-white
                  shadow-md mt-[4px] border border-neutral-200 rounded-md ring-offset-white data-[placeholder]:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950/35 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>
            </div>

            {/* income */}
            <div className='flex flex-col'>
              <Label
                htmlFor='income'
                className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
              >
                Income
              </Label>

              <div>
                <Input
                  type='number'
                  id='income'
                  placeholder='Income'
                  className='w-[280px] justify-start text-left font-normal text-black bg-white
                  shadow-md mt-[4px] border border-neutral-200 rounded-md ring-offset-white data-[placeholder]:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950/35 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                  onChange={(e) => setIncomeState(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 mt-[10px] border-dashed border border-black/10 relative py-[20px] h-full'>
          <Icon className='absolute h-6 w-6 -top-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -left-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -top-3 -right-3 text-gray-600' />
          <Icon className='absolute h-6 w-6 -bottom-3 -right-3 text-gray-600' />

          <div className='w-full h-full flex flex-col items-center justify-evenly gap-[60px] p-6'>
            <div className='flex flex-col'>
              <StateSelect data={usaStates} />
            </div>

            {/* montly debt */}
            <div className='flex flex-col'>
              <Label
                htmlFor='monthly-debt'
                className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
              >
                Monthly Debt
              </Label>

              <div>
                <Input
                  type='number'
                  id='monthly-debt'
                  placeholder='Debt'
                  className='w-[280px] justify-start text-left font-normal text-black bg-white
                  shadow-md mt-[4px] border border-neutral-200 rounded-md ring-offset-white data-[placeholder]:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-950/35 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                  onChange={(e) => setMonthlyDebtState(e.target.value)}
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <OccupancySelect />
            </div>
          </div>
        </div>
      </div>

      {showDialog && (
        <DecisionDialog
          prediction={predictionResult}
          probability_of_approval={approvalProbability}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      )}
    </div>
  );
};

export default Decision;
