import { ColumnDef } from "@tanstack/react-table";
import { OfficeType } from "../../../main/database/db-types";

export type OfficeTypeList = OfficeType & {
  action: React.ReactNode;
};

export const getColumns = (page: number, rowCount: number): ColumnDef<OfficeTypeList>[] => [
  {
    cell: ({ row }) => Number(row.id) + 1 + (page - 1) * rowCount + ".",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    cell: ({ row }) => (row.original.action ? row.original.action : "-"),
    header: "Action",
  },
];
