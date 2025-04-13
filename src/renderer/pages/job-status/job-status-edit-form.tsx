import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { showToast } from "@/lib/toast";
import { APIResponse } from "interface";
import LoadingIcon from "@/icons/loading-icon";
import EditIcon from "@/icons/edit-icon";

interface JobStatusEditFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobStatusEditForm({ setRefresh }: JobStatusEditFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name) return showToast("Status name is required.", "error");
    if (name.length < 3) return showToast("Status name must be at least 3 characters.", "error");
    if (name.length > 100) return showToast("Status name must be less than 100 characters.", "error");

    setLoading(true);
    window.StatusAPI.createNewStatus({ name: name.trim() }).then((res: APIResponse<number>) => {
      setLoading(false);
      if (res.success) {
        setRefresh(true);
        setIsOpen(false);
      } else {
        showToast("Error in adding status.", "error");
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        if (!isOpen) setName("");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="edit" size="sm">
          <EditIcon width={15} height={15} fill="#f8fafc" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90%] flex flex-col"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <DialogTitle className="text-[20px] font-bold">Edit Job Status</DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <label htmlFor="status-name" className="text-[15px] font-medium">
            Status Name
          </label>
          <Input id="status-name" className="mt-1" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{loading ? <LoadingIcon width={20} height={20} fill="#f8fafc" className="animate-spin" /> : <span>Save</span>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
