import { useEffect } from "react";

const JobStatusPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Job Status";
  }, []);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Job Status</h1>
    </div>
  );
};

export default JobStatusPage;
