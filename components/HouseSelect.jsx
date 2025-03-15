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

const HouseSelect = ({ data }) => {
  const { usaState, setUsaState, regionLoader, regions } =
    useContext(MortgageContext);

  const isDisabled = regionLoader || !regions || regions.length === 0;

  return (
    <>
      <Label
        htmlFor='select-house'
        className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
      >
        House Type
      </Label>

      <Select disabled={isDisabled}>
        <SelectTrigger id='select-house' className='w-[280px]'>
          <SelectValue placeholder='Select a house' />
        </SelectTrigger>

        <SelectContent>
          {data.map((house, idx) => (
            <SelectItem value={house} key={idx}>
              {house}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default HouseSelect;
