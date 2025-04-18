import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingIcon from "@/icons/loading-icon";
import DeleteIcon from "@/icons/delete-icon";

interface DeleteDialogrops {
  title: string;
  message: string;
  buttonSize?: "sm" | "default" | "lg";
  onSubmit: () => Promise<boolean>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderMessage = (message: string) => {
  const parts = message.split(/"([^"]+)"/g); // split by quoted text
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-black">
            "{part}"
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default function DeleteDialog({ title, message, buttonSize = "sm", onSubmit, setRefresh }: DeleteDialogrops) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await onSubmit();
    setLoading(false);
    if (result) {
      setRefresh(true);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="delete" size={buttonSize}>
          <DeleteIcon width={15} height={15} fill="#f8fafc" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90%] flex flex-col"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleDelete();
          }
        }}
      >
        <DialogTitle className="text-[20px] font-bold">{title}</DialogTitle>
        <DialogDescription className="text-[15px]">{renderMessage(message)}</DialogDescription>
        <DialogFooter>
          <Button disabled={loading} variant="delete" onClick={handleDelete}>
            {loading ? <LoadingIcon width={20} height={20} fill="#f8fafc" className="animate-spin" /> : <span>Delete</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
