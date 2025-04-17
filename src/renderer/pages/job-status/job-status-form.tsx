import AddDialog from "@/components/shared/add-dialog";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/toast";
import { APIResponse } from "interface";
import { useState } from "react";

interface JobStatusFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobStatusForm({ setRefresh }: JobStatusFormProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const resetForm = () => {
    setName("");
    setColor("#000000");
  };

  const submitForm = async () => {
    const trimmedName = name.trim();
    const selectedColor = color.split("#")[1] ?? "000000";

    if (!trimmedName) {
      showToast("Status name is required.", "error");
      return false;
    }

    if (trimmedName.length < 3) {
      showToast("Status name must be at least 3 characters.", "error");
      return false;
    }

    if (trimmedName.length > 100) {
      showToast("Status name must be less than 100 characters.", "error");
      return false;
    }

    try {
      const res: APIResponse<number> = await window.StatusAPI.create({ name: trimmedName, color: selectedColor });

      if (res.success) {
        showToast("Job status created successfully", "success");
        return true;
      } else {
        showToast(res.error, "error");
        return false;
      }
    } catch (error) {
      showToast("Unexpected error occurred.", "error");
      return false;
    }
  };

  return (
    <AddDialog onSubmit={submitForm} resetForm={resetForm} setRefresh={setRefresh} title="Add New Job Status">
      <div className="flex flex-col w-full text-black px-3 pb-2">
        <label htmlFor="name" className="text-[15px] font-medium">
          Status Name
        </label>
        <Input id="name" className="mt-1" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="color" className="mt-4 text-[15px] font-medium">
          Status Color
        </label>
        <Input id="color" type="color" className="mt-1" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
    </AddDialog>
  );
}
