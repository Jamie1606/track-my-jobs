import { useEffect, useState } from "react";
import { getColumns, OfficeTypeList } from "./columns";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { OfficeType } from "src/prisma-generated";
import { showToast } from "@/lib/toast";
import DeleteDialog from "@/components/shared/delete-dialog";
import OfficeTypeForm from "./office-type-form";
import OfficeTypeEditForm from "./office-type-edit-form";

const OfficeTypePage = () => {
  const [data, setData] = useState<OfficeTypeList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteOfficeType = async (officeTypeID: number) => {
    const res = await window.OfficeTypeAPI.delete(officeTypeID);
    if (res.success) {
      showToast("Office type deleted successfully", "success");
      return true;
    } else {
      showToast(res.error, "error");
      return false;
    }
  };

  const formatData = (data: OfficeType[]): OfficeTypeList[] => {
    return data.map((item) => {
      return {
        ...item,
        action: (
          <div className="flex items-center gap-x-2 justify-center">
            <OfficeTypeEditForm setRefresh={setRefresh} editID={item.officeTypeId} />
            <DeleteDialog setRefresh={setRefresh} title="Delete Office Type" message={`Are you sure you want to delete this office type "${item.name}"?`} onSubmit={() => deleteOfficeType(item.officeTypeId)} />
          </div>
        ),
      };
    });
  };

  const getList = async () => {
    const offset = (page - 1) * 10;
    const res = await window.OfficeTypeAPI.getList(search.trim(), limit, offset);
    if (res.success) {
      setData(formatData(res.data));
    } else {
      showToast(res.error, "error");
    }
  };

  const getCount = async () => {
    const res = await window.OfficeTypeAPI.getCount(search.trim());
    if (res.success) {
      setTotal(res.data);
    } else {
      showToast(res.error, "error");
    }
  };

  useEffect(() => {
    document.title = "Track My Jobs | Office Type";
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
      <h1 className="text-[25px] font-bold">Office Type</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {/* add new office type */}
          <OfficeTypeForm setRefresh={setRefresh} />
        </div>

        {/* job contents */}
        <div className="mt-6">
          <DataTable columns={getColumns(page, limit)} data={data} loading={loading} rowCount={limit} page={page} total={total} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default OfficeTypePage;
