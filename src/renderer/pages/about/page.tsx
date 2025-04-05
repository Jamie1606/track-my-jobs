import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | About";
  }, []);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">About</h1>
    </div>
  );
};

export default AboutPage;
