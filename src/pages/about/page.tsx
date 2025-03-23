import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | About";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label className="">This is About Page</label>
      <Button>Click Me</Button>
    </div>
  );
};

export default AboutPage;
