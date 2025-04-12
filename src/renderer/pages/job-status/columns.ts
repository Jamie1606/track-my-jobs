import { ColumnDef } from "@tanstack/react-table";
import { Status } from "../../../main/database/schema";

export type JobStatus = Status & {
  action?: React.ReactNode;
};

export const columns: ColumnDef<JobStatus>[] = [
  {
    cell: ({ row }) => Number(row.id) + 1 + ".",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: "Status Name",
  },
  {
    cell: ({ row }) => (row.original.action ? row.original.action : "-"),
    header: "Action",
  },
];
