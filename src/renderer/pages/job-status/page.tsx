import { DataTable } from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/toast";
import { columns, JobStatus } from "./columns";
import CustomPagination from "@/components/shared/custom-pagination";
import JobStatusForm from "./job-status-form";
import JobStatusEditForm from "./job-status-edit-form";
import DeleteDialog from "@/components/shared/delete-dialog";

const JobStatusPage = () => {
  const [data, setData] = useState<JobStatus[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const formatData = (data: JobStatus[]) => {
    return data.map((item) => {
      return {
        ...item,
        action: (
          <div className="flex items-center gap-x-2 justify-center">
            <JobStatusEditForm setRefresh={setRefresh} editID={item.statusId} />
            <DeleteDialog
              setRefresh={setRefresh}
              title="Delete Job Status"
              message={`Are you sure you want to delete this job status "${item.name}"?`}
              onSubmit={() =>
                new Promise((resolve) =>
                  setTimeout(() => {
                    resolve(true);
                  }, 500)
                )
              }
            />
          </div>
        ),
      };
    });
  };

  useEffect(() => {
    document.title = "Track My Jobs | Job Status";

    window.StatusAPI.getStatusList("", 10, 0).then((res) => {
      if (res.success) {
        setData(formatData(res.data));
      } else {
        showToast("Error in retrieving status data.", "error");
      }
    });
  }, []);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(true);
  //     window.StatusAPI.getStatusList(search, limit, page).then((res) => {
  //       if (res.success) {
  //         setData(res.data);
  //       }
  //       setLoading(false);
  //       setRefresh(false);
  //     });
  //   }, 300);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [search, page, limit, refresh]);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Job Status</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" />
          </div>

          {/* add new job status */}
          <JobStatusForm setRefresh={setRefresh} />
        </div>

        {/* job contents */}
        <div className="mt-6">
          <DataTable columns={columns} data={data} />
        </div>

        {/* pagination */}
        <div className="w-full lg:px-4 xl:px-8 flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center basis-1/2 gap-x-4">
            <label className="text-[15px]">1 - 15 of {total} rows</label>
          </div>
          <CustomPagination current={page} total={total} onPageChange={setPage} className="justify-end" />
        </div>
      </div>
    </div>
  );
};

export default JobStatusPage;
