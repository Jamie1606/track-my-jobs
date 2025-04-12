import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddIcon from "@/icons/add-icon";
import { useState } from "react";

export default function JobStatusForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon width={22} height={22} fill="#f8fafc" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] flex flex-col">
        <DialogHeader>
          <h2 className="text-[20px] font-bold">Add Job Status</h2>
        </DialogHeader>
        <DialogDescription className="overflow-y-auto">
          <div className="flex flex-col w-full text-black px-3 pb-2">
            <label htmlFor="status-name" className="text-[15px] font-medium">
              Status Name
            </label>
            <Input id="status-name" className="mt-1" />
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
