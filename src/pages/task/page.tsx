import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const TaskPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Task";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Task Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default TaskPage;
