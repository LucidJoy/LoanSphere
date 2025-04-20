import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DecisionDialog = ({
  prediction,
  probability_of_approval,
  showDialog,
  setShowDialog,
}) => {
  return (
    <>
      <Dialog onOpenChange={() => setShowDialog(!showDialog)} open={showDialog}>
        {/* <DialogTrigger>Loan Decision</DialogTrigger> */}

        <DialogContent>
          <DialogHeader>
            <DialogTitle className='font-normal font-mono tracking-normal text-gray-900 text-[24px] mb-[10px]'>
              Loan Decision
            </DialogTitle>

            <DialogDescription>
              <span className='text-black font-mono'>Prediction: </span>
              {prediction}
            </DialogDescription>
            <DialogDescription>
              <span className='text-black font-mono'>
                {" "}
                Probability of Approval:{" "}
              </span>
              {probability_of_approval}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DecisionDialog;
