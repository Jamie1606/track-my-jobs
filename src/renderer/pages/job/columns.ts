import { ColumnDef } from "@tanstack/react-table";
import { JobList } from "src/main/database/db-types";

export type JobApplication = JobList & {
  action: React.ReactNode;
  statusBadge: React.ReactNode;
};

export const getColumns = (page: number, rowCount: number): ColumnDef<JobApplication>[] => [
  {
    cell: ({ row }) => Number(row.id) + 1 + (page - 1) * rowCount + ".",
    header: "No.",
  },
  {
    header: "Role",
    accessorKey: "title",
  },
  {
    header: "Employer",
    accessorKey: "employerName",
  },
  {
    header: "Office Type",
    accessorKey: "officeTypeName",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Status",
    cell: ({ row }) => row.original.statusBadge,
  },
  {
    cell: ({ row }) => (row.original.action ? row.original.action : "-"),
    header: "Action",
  },
];
