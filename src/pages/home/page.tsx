import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Home";
  }, []);

  return (
    <>
      <label className="text-4xl text-red-500">This is Home Page</label>
      <Button>Click Me</Button>
    </>
  );
};

export default HomePage;
