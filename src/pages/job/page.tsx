import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const JobPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Job";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Job Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default JobPage;
