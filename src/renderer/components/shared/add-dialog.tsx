import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddIcon from "@/icons/add-icon";
import { useState } from "react";
import LoadingIcon from "@/icons/loading-icon";

interface AddDialogProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  buttonSize?: "sm" | "default" | "lg";
  resetForm: () => void;
  onSubmit: () => Promise<boolean>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddDialog({ children, title, description, buttonSize = "sm", resetForm, onSubmit, setRefresh }: AddDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await onSubmit();
    setLoading(false);
    if (result) {
      setRefresh(true);
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button size={buttonSize}>
          <AddIcon width={22} height={22} fill="#f8fafc" />
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
        <DialogTitle className="text-[20px] font-bold">{title}</DialogTitle>
        <DialogDescription className="text-[15px]">{description}</DialogDescription>
        <>{children}</>
        <DialogFooter>
          <Button onClick={handleSubmit}>{loading ? <LoadingIcon width={20} height={20} fill="#f8fafc" className="animate-spin" /> : <span>Save</span>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
