import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  className?: string;
}

export default function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("flex justify-between items-center text-left font-normal border-slate-400 h-9", !date && "text-muted-foreground", className)}>
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon width={18} height={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
