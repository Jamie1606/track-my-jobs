import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import CustomPagination from "./custom-pagination";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  rowCount?: number;
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function DataTable<TData, TValue>({ columns, data, loading = false, rowCount = 10, total, page, setPage }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border border-slate-400/30 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-[#1d4ed8]/15 bg-[#1d4ed8]/15">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center font-semibold px-4 text-[15px] py-3 select-none" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(rowCount)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((_, columnIndex) => (
                    <TableCell key={columnIndex} className="px-2 text-center h-10">
                      <Skeleton className="w-full h-full rounded-sm" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center px-4 text-[15px]" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-20 text-center px-4 text-[15px]">
                  <label className="text-red-600">No results.</label>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full lg:px-4 xl:px-8 flex items-center justify-between mt-6 mb-4">
        <div className="flex items-center basis-1/2 gap-x-4">
          <label className="text-[15px] select-none">
            {(page - 1) * rowCount + 1} - {page * rowCount < total ? page * rowCount : total} of {total} rows
          </label>
        </div>
        <CustomPagination current={page} total={total} limit={rowCount} onPageChange={setPage} className="justify-end" />
      </div>
    </>
  );
}
