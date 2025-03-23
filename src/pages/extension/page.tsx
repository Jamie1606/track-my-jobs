import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ExtensionPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Extension";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is Extension Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default ExtensionPage;
