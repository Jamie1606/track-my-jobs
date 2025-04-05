import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const PeoplePage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | People";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is People Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default PeoplePage;
