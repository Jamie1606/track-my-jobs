import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import JobForm from "./job-form";
import { DataTable } from "@/components/shared/data-table";
import { getColumns, JobApplication } from "./columns";
import { showToast } from "@/lib/toast";
import { JobList } from "src/main/database/db-types";
import { Badge } from "@/components/ui/badge";
import { getContrastTextColor } from "@/lib/utils";

const JobPage = () => {
  const [data, setData] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const formatData = (data: JobList[]): JobApplication[] => {
    return data.map((item) => ({
      ...item,
      action: <div></div>,
      statusBadge: (
        <Badge className="font-semibold lowercase" style={{ backgroundColor: "#" + (item.color ?? "000000"), color: getContrastTextColor(item.color ?? "000000") }}>
          {item.status}
        </Badge>
      ),
    }));
  };

  const getList = async () => {
    const offset = (page - 1) * 10;
    const res = await window.JobAPI.getList(search.trim(), limit, offset);
    if (res.success) {
      setData(formatData(res.data));
    } else {
      showToast(res.error, "error");
    }
  };

  const getCount = async () => {
    const res = await window.JobAPI.getCount(search.trim());
    if (res.success) {
      setTotal(res.data);
    } else {
      showToast(res.error, "error");
    }
  };

  useEffect(() => {
    document.title = "Track My Jobs | Job Applications";
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
      <h1 className="text-[25px] font-bold">Jobs</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" />
          </div>

          {/* add new job application */}
          <JobForm setRefresh={setRefresh} />
        </div>

        {/* job contents */}
        <div className="mt-6">
          <DataTable columns={getColumns(page, limit)} data={data} page={page} setPage={setPage} total={total} loading={loading} rowCount={limit} />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
