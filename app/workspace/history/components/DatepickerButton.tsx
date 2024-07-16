"use client"
import React, { useRef } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'


const DatepickerButton = () => {
    // const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString())

    const [date, setDate] = React.useState<Date>()
    const searchDate = React.useRef<any>();

    const setDateParams = () => {
        // router.push(`/workspace/history?date=${date}`)
        // let name = 'searchDate';
        // let value = date;
        // params.set(name, date)
        console.log("Date set to: ", searchDate)
    }



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={searchDate.current}
          onSelect={searchDate.current}
          onDayClick={setDateParams}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatepickerButton