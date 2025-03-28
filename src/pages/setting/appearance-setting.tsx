import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AppearanceSetting() {
  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex items-center pb-5 border-b">
        <div className="flex flex-col w-96">
          <h3 className="text-[17px] font-semibold">Screen Width</h3>
          <label className="text-[16px] mt-2 text-slate-600">Change the width of the application.</label>
        </div>
        <div className="flex flex-col">
          <Input type="number" className="max-w-56" min={1000} />
          <label className="text-[14px] mt-2 text-red-500">The value must be between 1000 and 5000.</label>
        </div>
      </div>
      <div className="flex items-center mt-5 pb-5 border-b">
        <div className="flex flex-col w-96">
          <h3 className="text-[17px] font-semibold">Screen Height</h3>
          <label className="text-[16px] mt-2 text-slate-600">Change the height of the application.</label>
        </div>
        <Input className="max-w-56" />
      </div>
      <div className="flex items-center mt-5 pb-5 border-b">
        <div className="flex flex-col w-96">
          <h3 className="text-[17px] font-semibold">Font Size</h3>
          <label className="text-[16px] mt-2 text-slate-600">Change the font size of the application.</label>
        </div>
        <Input className="max-w-56" />
      </div>
      <div className="flex items-center mt-5 pb-5 border-b">
        <div className="flex flex-col w-96">
          <h3 className="text-[17px] font-semibold">Icon Size</h3>
          <label className="text-[16px] mt-2 text-slate-600">Change the icon size of the application.</label>
        </div>
        <Input className="max-w-56" />
      </div>
      <div className="mt-4 flex items-center gap-x-4 justify-end">
        <Button>Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
