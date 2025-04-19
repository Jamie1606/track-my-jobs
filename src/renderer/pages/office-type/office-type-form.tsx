import AddDialog from "@/components/shared/add-dialog";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/toast";
import { APIResponse } from "interface";
import { useState } from "react";

interface OfficeTypeFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OfficeTypeForm({ setRefresh }: OfficeTypeFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
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
      const res: APIResponse<number> = await window.OfficeTypeAPI.create({ name: trimmedName });
      setLoading(false);

      if (res.success) {
        showToast("Office type created successfully", "success");
        return true;
      } else {
        showToast(res.error, "error");
        return false;
      }
    } catch (error) {
      showToast("Unexpected error occurred.", "error");
      setLoading(false);
      return false;
    }
  };

  return (
    <AddDialog onSubmit={submitForm} resetForm={resetForm} setRefresh={setRefresh} title="Add New Office Type">
      <div className="flex flex-col w-full text-black px-3 pb-2">
        <label htmlFor="office-type-name" className="text-[15px] font-medium">
          Office Type Name
        </label>
        <Input disabled={loading} id="office-type-name" className="mt-1" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </AddDialog>
  );
}
