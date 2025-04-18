import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/shared/date-picker";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import AddDialog from "@/components/shared/add-dialog";
import { showToast } from "@/lib/toast";
import { Status } from "src/prisma-generated";

interface JobFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobForm({ setRefresh }: JobFormProps) {
  const [title, setTitle] = useState("");
  const [applicationDate, setApplicationDate] = useState<Date>();
  const [selectedStatus, setSelectedStatus] = useState<number>();
  const [statusData, setStatusData] = useState<Status[]>([]);

  const [loading, setLoading] = useState(false);

  const getAllStatus = async () => {
    const res = await window.StatusAPI.getAll();
    if (res.success) {
      setStatusData(res.data);
    } else {
      showToast(res.error, "error");
    }
  };

  useEffect(() => {
    getAllStatus();
  }, []);

  const resetForm = () => {
    setTitle("");
  };

  const submitForm = async () => {
    return true;
  };

  return (
    <AddDialog onSubmit={submitForm} resetForm={resetForm} setRefresh={setRefresh} title="Add New Job Application">
      <div className="flex flex-col w-full text-black px-3 pb-2 overflow-y-auto">
        <label htmlFor="job-title" className="text-[15px] font-medium">
          Job Title
        </label>
        <Input disabled={loading} id="job-title" className="mt-1 shrink-0" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={150} />

        <label htmlFor="employer" className="mt-4 text-[15px] font-medium">
          Employer
        </label>
        <Input disabled={loading} className="mt-1 shrink-0" id="employer" />

        <label htmlFor="application-date" className="mt-4 text-[15px] font-medium">
          Application Date
        </label>
        <DatePicker disabled={loading} id="application-date" className="mt-1 shrink-0" value={applicationDate} onChange={(value) => setApplicationDate(value)} />

        <label htmlFor="application-status" className="mt-4 text-[15px] font-medium">
          Application Status
        </label>
        <Select defaultValue="applied" value={selectedStatus + ""} onValueChange={(value) => setSelectedStatus(isNaN(Number(value)) ? undefined : Number(value))}>
          <SelectTrigger id="application-status" className="w-full mt-1 shrink-0 capitalize">
            <SelectValue placeholder="Application Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undefined">Select Application Status</SelectItem>
            {statusData.map((item, index) => (
              <SelectItem className="capitalize" key={index} value={item.statusId + ""}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label htmlFor="office-type" className="mt-4 text-[15px] font-medium">
          Office Type
        </label>
        <Select defaultValue="onsite">
          <SelectTrigger id="office-type" className="w-full mt-1 shrink-0">
            <SelectValue placeholder="Office Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="onsite">Onsite</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>

        <label htmlFor="location" className="mt-4 text-[15px] font-medium">
          Location
        </label>
        <Input id="location" className="mt-1 shrink-0" />

        <label htmlFor="referred-by" className="mt-4 text-[15px] font-medium">
          Referred By
        </label>
        <Input id="referred-by" className="mt-1 shrink-0" />

        <label htmlFor="job-description" className="mt-4 text-[15px] font-medium">
          Job Description
        </label>
        <Input id="job-description" className="mt-1 shrink-0" />

        <label htmlFor="job-link" className="mt-4 text-[15px] font-medium">
          Link to Job Posting
        </label>
        <Input id="job-link" className="mt-1 shrink-0" />

        <label htmlFor="resume" className="mt-4 text-[15px] font-medium">
          Resume
        </label>
        <Input id="resume" type="file" accept=".pdf" className="mt-1 shrink-0" />

        <label htmlFor="cover-letter" className="mt-4 text-[15px] font-medium">
          Cover Letter
        </label>
        <Input id="cover-letter" type="file" accept=".pdf" className="mt-1 shrink-0 mb-4" />
      </div>
    </AddDialog>
  );
}
