import { ColumnDef } from "@tanstack/react-table";
import { Job } from "../../../main/database/schema";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type JobApplication = Job & {
  jobId: number;
  location: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  action: React.ReactNode;
};

export const columns: ColumnDef<JobApplication>[] = [
  {
    cell: ({ row }) => Number(row.id) + 1 + ".",
    header: "No.",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    cell: ({ row }) => row.original.action,
    header: "Action",
  },
];
