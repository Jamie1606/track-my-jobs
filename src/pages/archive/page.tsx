import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ArchivePage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Archive";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Archive Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default ArchivePage;
