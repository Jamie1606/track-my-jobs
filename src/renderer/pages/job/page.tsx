import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import AddIcon from "@/icons/add-icon";
import TableViewIcon from "@/icons/table-view-icon";
import ViewListIcon from "@/icons/view-list-icon";
import { useEffect, useState } from "react";
import JobForm from "./job-form";
import CustomPagination from "@/components/shared/custom-pagination";
import { DataTable } from "@/components/shared/data-table";
import { columns, JobApplication } from "./columns";
import { Link } from "react-router";

const JobPage = () => {
  const [view, setView] = useState<"table" | "list">("table");
  const data: JobApplication[] = [
    {
      jobId: 1,
      location: "Kathmandu",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
    {
      jobId: 2,
      location: "100",
      status: "pending",
      email: "m@example.com",
      action: <Link to="">Hello</Link>,
    },
  ];

  useEffect(() => {
    document.title = "Track My Jobs | Job Applications";
  }, []);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Jobs</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" />

            {/* view options */}
            <Button variant="icon" size="icon" onClick={() => setView((prev) => (prev === "table" ? "list" : "table"))} title={view === "table" ? "List View" : "Table View"}>
              {view === "list" ? <TableViewIcon width={22} height={22} fill="#1e293b" /> : <ViewListIcon width={22} height={22} fill="#1e293b" />}
            </Button>
          </div>

          {/* add new job application form */}
          <JobForm />
        </div>

        {/* job contents */}
        <div className="mt-6">
          <DataTable columns={columns} data={data} />
        </div>

        {/* pagination */}
        <div className="w-full lg:px-4 xl:px-8 flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center basis-1/2 gap-x-4">
            <label className="text-[15px]">1 - 15 of 200 rows</label>
          </div>
          <CustomPagination className="justify-end" />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
