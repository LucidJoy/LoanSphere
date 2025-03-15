"use client";

import React, { useContext } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { MortgageContext } from "@/context/MortgageContext";

const DatePicker = ({ label, type }) => {
  const { endDate, setEndDate, startDate, setStartDate } =
    useContext(MortgageContext);

  const selectedDate = type === "start" ? startDate : endDate;
  const setSelectedDate = type === "start" ? setStartDate : setEndDate;

  return (
    <>
      <Label
        htmlFor='select-date'
        className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'
      >
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild id='select-date'>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal text-black px-4 py-6 mt-[4px] shadow-md",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
