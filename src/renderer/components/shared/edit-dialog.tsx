import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingIcon from "@/icons/loading-icon";
import EditIcon from "@/icons/edit-icon";

interface EditDialogProps {
  children: React.ReactNode;
  editID: number;
  title: string;
  description?: string;
  buttonSize?: "sm" | "default" | "lg";
  checkDataExist: () => Promise<boolean>;
  resetForm: () => void;
  onSubmit: () => Promise<boolean>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditDialog({ children, editID, title, description, buttonSize = "sm", checkDataExist, resetForm, onSubmit, setRefresh }: EditDialogProps) {
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

  // check whether the data exists in database
  const handleCheckData = async () => {
    const result = await checkDataExist();
    if (!result) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleCheckData();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="edit" size={buttonSize}>
          <EditIcon width={22} height={22} fill="#f8fafc" />
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
        <div className="flex flex-col w-full text-black px-3 pb-2">{children}</div>
        <DialogFooter>
          <Button variant="edit" onClick={handleSubmit}>{loading ? <LoadingIcon width={20} height={20} fill="#f8fafc" className="animate-spin" /> : <span>Edit</span>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
