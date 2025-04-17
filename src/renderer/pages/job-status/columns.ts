import { ColumnDef } from "@tanstack/react-table";
import { Status } from "../../../main/database/db-types";

export type JobStatus = Status & {
  badge?: React.ReactNode;
  action?: React.ReactNode;
};

export const getColumns = (page: number, rowCount: number): ColumnDef<JobStatus>[] => [
  {
    cell: ({ row }) => Number(row.id) + 1 + (page - 1) * rowCount + ".",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: "Status Name",
  },
  {
    header: "Badge",
    cell: ({ row }) => row.original.badge,
  },
  {
    cell: ({ row }) => (row.original.action ? row.original.action : "-"),
    header: "Action",
  },
];
