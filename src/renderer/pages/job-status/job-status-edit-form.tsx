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
  const [color, setColor] = useState("#000000");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setColor("#000000");
  };

  const checkDataExist = async () => {
    const result = await window.StatusAPI.getById(editID);
    if (result.success) {
      setName(result.data.name);
      setColor("#" + result.data.color);
      return true;
    }
    showToast("Invalid status data", "error");
    return false;
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
      setLoading(true);
      const res = await window.StatusAPI.update(trimmedName, editID, selectedColor);
      setLoading(false);

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
        <Input disabled={loading} id="status-name" className="mt-1" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="color" className="mt-4 text-[15px] font-medium">
          Status Color
        </label>
        <Input disabled={loading} id="color" type="color" className="mt-1" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
    </EditDialog>
  );
}
