import * as React from "react";
import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MortgageContext } from "@/context/MortgageContext";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const RegionSelect = ({ data }) => {
  const { usaState, setUsaState, regionLoader, regions } =
    useContext(MortgageContext);

  const isDisabled = regionLoader || !regions || regions.length === 0;

  return (
    <>
      <Label
        htmlFor='select-region'
        className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
      >
        Region
      </Label>

      <Select disabled={isDisabled}>
        <SelectTrigger id='select-region' className='w-[280px]'>
          <SelectValue placeholder='Select a region' />
        </SelectTrigger>

        <SelectContent>
          {data.map((region, idx) => (
            <SelectItem value={region.regionName} key={idx}>
              {region.regionName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default RegionSelect;
