import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/shared/date-picker";
import { Input } from "@/components/ui/input";

export default function JobForm() {
  return (
    <div className="flex flex-col w-full text-black px-3 pb-2">
      <label htmlFor="job-title" className="text-[15px] font-medium">
        Job Title
      </label>
      <Input id="job-title" className="mt-1" />

      <label htmlFor="employer" className="mt-4 text-[15px] font-medium">
        Employer
      </label>
      <Input className="mt-1" id="employer" />

      <label htmlFor="application-date" className="mt-4 text-[15px] font-medium">
        Application Date
      </label>
      <DatePicker id="application-date" className="mt-1" />

      <label htmlFor="application-status" className="mt-4 text-[15px] font-medium">
        Application Status
      </label>
      <Select defaultValue="applied">
        <SelectTrigger id="application-status" className="w-full mt-1">
          <SelectValue placeholder="Application Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="applied">Applied</SelectItem>
        </SelectContent>
      </Select>

      <label htmlFor="office-type" className="mt-4 text-[15px] font-medium">
        Office Type
      </label>
      <Select defaultValue="onsite">
        <SelectTrigger id="office-type" className="w-full mt-1">
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
      <Input id="location" className="mt-1" />

      <label htmlFor="referred-by" className="mt-4 text-[15px] font-medium">
        Referred By
      </label>
      <Input id="referred-by" className="mt-1" />

      <label htmlFor="job-description" className="mt-4 text-[15px] font-medium">
        Job Description
      </label>
      <Input id="job-description" className="mt-1" />

      <label htmlFor="job-link" className="mt-4 text-[15px] font-medium">
        Link to Job Posting
      </label>
      <Input id="job-link" className="mt-1" />
    </div>
  );
}
