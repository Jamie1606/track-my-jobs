import { ColumnDef } from "@tanstack/react-table";
import { Status } from "../../../main/database/schema";

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
    header: "badge",
    cell: ({ row }) => row.original.badge,
  },
  {
    cell: ({ row }) => (row.original.action ? row.original.action : "-"),
    header: "Action",
  },
];
