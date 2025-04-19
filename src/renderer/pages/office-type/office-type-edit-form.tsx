import { Input } from "@/components/ui/input";
import { useState } from "react";
import { showToast } from "@/lib/toast";
import EditDialog from "@/components/shared/edit-dialog";

interface OfficeTypeEditFormProps {
  editID: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OfficeTypeEditForm({ editID, setRefresh }: OfficeTypeEditFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
  };

  const checkDataExist = async () => {
    const result = await window.OfficeTypeAPI.getById(editID);
    if (result.success) {
      setName(result.data.name);
      return true;
    }
    showToast("Invalid office type data", "error");
    return false;
  };

  const submitForm = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      showToast("Office type name is required.", "error");
      return false;
    }

    if (trimmedName.length < 3) {
      showToast("Office type name must be at least 3 characters.", "error");
      return false;
    }

    if (trimmedName.length > 100) {
      showToast("Office type name must be less than 100 characters.", "error");
      return false;
    }

    try {
      setLoading(true);
      const res = await window.OfficeTypeAPI.update(trimmedName, editID);
      setLoading(false);

      if (res.success) {
        showToast("Office type updated successfully", "success");
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
    <EditDialog title="Edit Office Type" resetForm={resetForm} checkDataExist={checkDataExist} onSubmit={submitForm} setRefresh={setRefresh}>
      <div className="flex flex-col w-full text-black px-3 pb-2">
        <label htmlFor="office-type-name" className="text-[15px] font-medium">
          Office Type Name
        </label>
        <Input disabled={loading} id="office-type-name" className="mt-1" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </EditDialog>
  );
}
