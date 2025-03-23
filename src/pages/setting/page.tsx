import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const SettingPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Setting";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Setting Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default SettingPage;
