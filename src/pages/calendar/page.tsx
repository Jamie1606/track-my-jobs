import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CalendarPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Calendar";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Calendar Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default CalendarPage;
