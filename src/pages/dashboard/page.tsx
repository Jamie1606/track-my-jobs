import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Dashboard";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Home Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default DashboardPage;
