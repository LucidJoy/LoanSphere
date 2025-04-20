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

const StateSelect = ({ data, label, placeholder, id }) => {
  const { usaState, setUsaState, regionLoader } = useContext(MortgageContext);

  return (
    <>
      <Label
        htmlFor='select-state'
        className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
      >
        State
      </Label>

      <Select
        onValueChange={setUsaState}
        value={usaState}
        className={cn(regionLoader && "select-none cursor-not-allowed")}
      >
        <SelectTrigger id='select-state' className='w-[280px]'>
          <SelectValue placeholder='Select a state' />
        </SelectTrigger>

        <SelectContent>
          {data.map((state, idx) => (
            <SelectItem value={state} key={idx}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default StateSelect;
