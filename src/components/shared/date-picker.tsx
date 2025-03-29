import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  id?: string;
  className?: string;
}

export default function DatePicker({ id, className }: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} variant={"outline"} className={cn("flex justify-between items-center text-left font-normal border-slate-400 h-9", !date && "text-muted-foreground", className)} onClick={() => setOpen(true)}>
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon width={18} height={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          className="w-full"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
