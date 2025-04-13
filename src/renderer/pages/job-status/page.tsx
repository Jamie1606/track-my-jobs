import { DataTable } from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/toast";
import { columns, JobStatus } from "./columns";
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
  const [loading, setLoading] = useState<boolean>(true);

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

  const getList = async () => {
    const offset = (page - 1) * 10;
    const res = await window.StatusAPI.getStatusList(search.trim(), limit, offset);
    if (res.success) {
      setData(formatData(res.data));
    } else {
      showToast(res.error, "error");
    }
  };

  const getCount = async () => {
    const res = await window.StatusAPI.getStatusCount(search.trim());
    if (res.success) {
      setTotal(res.data);
    } else {
      showToast(res.error, "error");
    }
  };

  useEffect(() => {
    document.title = "Track My Jobs | Job Status";
  }, []);

  useEffect(() => {
    if (!loading) {
      getList();
    }
  }, [page, limit]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Promise.all([getList(), getCount()]).finally(() => {
        setLoading(false);
        setRefresh(false);
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, refresh]);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Job Status</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {/* add new job status */}
          <JobStatusForm setRefresh={setRefresh} />
        </div>

        {/* job contents */}
        <div className="mt-6">
          <DataTable columns={columns} data={data} loading={loading} rowCount={limit} page={page} total={total} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default JobStatusPage;
