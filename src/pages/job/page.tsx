import DatePicker from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TableViewIcon from "@/icons/table-view-icon";
import ViewListIcon from "@/icons/view-list-icon";
import { useEffect } from "react";

const JobPage = () => {
  useEffect(() => {
    document.title = "Track My Jobs | Job";
  }, []);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Jobs</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-96 mr-4" />

            {/* view options */}
            <Button variant="icon" size="icon">
              <TableViewIcon width={22} height={22} fill="#1e293b" />
            </Button>
            <Button variant="icon" size="icon">
              <ViewListIcon width={22} height={22} fill="#1e293b" />
            </Button>
          </div>

          {/* add new job application form */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90%] flex flex-col">
              <DialogHeader>
                <h2 className="text-[20px] font-bold">Add Job Application</h2>
              </DialogHeader>
              <DialogDescription className="overflow-y-auto">
                <div className="flex flex-col w-full text-black px-3 pb-2">
                  <label className="text-[15px] font-medium">Job Title</label>
                  <Input className="mt-1" />
                  <label className="mt-4 text-[15px] font-medium">Employer</label>
                  <Input className="mt-1" />
                  <label className="mt-4 text-[15px] font-medium">Application Date</label>
                  <DatePicker className="mt-1" />
                  <label className="mt-4 text-[15px] font-medium">Application Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Application Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="mt-4 text-[15px] font-medium">Office Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Office Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="mt-4 text-[15px] font-medium">Location</label>
                  <Input className="mt-1" />
                  <label className="mt-4 text-[15px] font-medium">Referred By</label>
                  <Input className="mt-1" />
                  <label className="mt-4 text-[15px] font-medium">Job Description</label>
                  <Input className="mt-1" />
                  <label className="mt-4 text-[15px] font-medium">Link to Job Posting</label>
                  <Input className="mt-1" />
                </div>
              </DialogDescription>
              <DialogFooter>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* job contents */}
      </div>
    </div>
  );
};

export default JobPage;
