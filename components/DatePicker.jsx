"use client";

import { format, addYears, subYears } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MortgageContext } from "@/context/MortgageContext";
import { useContext } from "react";
import * as React from "react";

const DatePicker = ({ label, type, fromDate, toDate }) => {
  const { endDate, setEndDate, startDate, setStartDate, year, setYear } =
    useContext(MortgageContext);
  const [month, setMonth] = React.useState(new Date());

  const handlePreviousYear = () => {
    const newYear = year - 1;
    setYear(newYear);
    setMonth((prevMonth) => subYears(prevMonth, 1));
  };

  const handleNextYear = () => {
    const newYear = year + 1;
    setYear(newYear);
    setMonth((prevMonth) => addYears(prevMonth, 1));
  };

  const selectedDate = type === "start" ? startDate : endDate;
  const setSelectedDate = type === "start" ? setStartDate : setEndDate;

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-normal font-mono tracking-wide text-gray-600 text-[18px]'>
        {label}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal text-black py-6 shadow-md",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0'>
          <div className='flex items-center justify-between px-4 pt-3'>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
              onClick={handlePreviousYear}
            >
              <ChevronsLeft className='h-4 w-4' />
              <span className='sr-only'>Previous Year</span>
            </Button>

            <div className='text-sm font-medium'>{format(month, "yyyy")}</div>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
              onClick={handleNextYear}
            >
              <ChevronsRight className='h-4 w-4' />
              <span className='sr-only'>Next Year</span>
            </Button>
          </div>

          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            initialFocus
            fromDate={fromDate}
            toDate={toDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
