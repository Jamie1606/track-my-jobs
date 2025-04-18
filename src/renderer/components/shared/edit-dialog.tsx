import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingIcon from "@/icons/loading-icon";
import EditIcon from "@/icons/edit-icon";

interface EditDialogProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  buttonSize?: "sm" | "default" | "lg";
  checkDataExist: () => Promise<boolean>;
  resetForm: () => void;
  onSubmit: () => Promise<boolean>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditDialog({ children, title, description, buttonSize = "sm", checkDataExist, resetForm, onSubmit, setRefresh }: EditDialogProps) {
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
    if (isOpen) handleCheckData();
  }, [isOpen]);

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
        <DialogTitle className="text-[20px] font-bold">{title}</DialogTitle>
        <DialogDescription className="text-[15px]">{description}</DialogDescription>
        <>{children}</>
        <DialogFooter>
          <Button disabled={loading} variant="edit" onClick={handleSubmit}>
            {loading ? <LoadingIcon width={20} height={20} fill="#f8fafc" className="animate-spin" /> : <span>Edit</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
