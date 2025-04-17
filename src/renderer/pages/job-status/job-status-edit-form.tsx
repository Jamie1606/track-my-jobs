import { Input } from "@/components/ui/input";
import { useState } from "react";
import { showToast } from "@/lib/toast";
import EditDialog from "@/components/shared/edit-dialog";

interface JobStatusEditFormProps {
  editID: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobStatusEditForm({ editID, setRefresh }: JobStatusEditFormProps) {
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
  };

  const checkDataExist = async () => {
    const result = await window.StatusAPI.getById(editID);
    if (result.success) {
      setName(result.data.name);
      return true;
    }
    showToast("Invalid status data", "error");
    return false;
  };

  const submitForm = async () => {
    const trimmedName = name.trim();

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
      const res = await window.StatusAPI.update(trimmedName, editID, "000000");
      
      if (res.success) {
        showToast("Job status updated successfully", "success");
        return true;
      } else {
        showToast(res.error, "error");
        return true;
      }
    } catch (error) {
      showToast("Unexpected error occurred.", "error");
      return false;
    }
  };

  return (
    <EditDialog title="Edit Job Status" resetForm={resetForm} checkDataExist={checkDataExist} onSubmit={submitForm} setRefresh={setRefresh}>
      <div className="flex flex-col w-full text-black px-3 pb-2">
        <label htmlFor="status-name" className="text-[15px] font-medium">
          Status Name
        </label>
        <Input id="status-name" className="mt-1" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </EditDialog>
  );
}
