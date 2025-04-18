import * as React from "react";
import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MortgageContext } from "@/context/MortgageContext";
import { cn } from "@/lib/utils";
import { occupancyTypes } from "@/constants/occupancyTypes";

const OccupancySelect = ({ data, label, placeholder, id }) => {
  const { occType, setOccType, regionLoader } = useContext(MortgageContext);

  return (
    <>
      <Label
        htmlFor='occupancy-state'
        className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
      >
        Occupancy Type
      </Label>

      <Select
        onValueChange={setOccType}
        value={occType}
        className={cn(regionLoader && "select-none cursor-not-allowed")}
      >
        <SelectTrigger id='occupancy-state' className='w-[280px]'>
          <SelectValue placeholder='Select a occupancy' />
        </SelectTrigger>

        <SelectContent>
          {occupancyTypes.map((type, idx) => (
            <SelectItem value={type} key={idx}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default OccupancySelect;
