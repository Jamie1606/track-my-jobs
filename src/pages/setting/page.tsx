import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSettingStore from "@/state/setting-store";
import { useEffect } from "react";
import AppearanceSetting from "./appearance-setting";

const SettingPage = () => {
  const width = useSettingStore((state) => state.width);
  const height = useSettingStore((state) => state.height);
  const uiScaling = useSettingStore((state) => state.uiScaling);

  useEffect(() => {
    document.title = "Track My Jobs | Setting";
  }, []);

  useEffect(() => {
    console.log(width);
  }, [width]);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Settings</h1>

      <Tabs defaultValue="appearance" className="w-full mt-4">
        <TabsList>
          <TabsTrigger className="text-[15px]" value="appearance">
            Appearance
          </TabsTrigger>
          <TabsTrigger className="text-[15px]" value="backup">
            Backup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appearance">
          <AppearanceSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
