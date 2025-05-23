/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCompanyList } from "@/services/company-service"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { companyAtom } from "../atoms"
import clsx from "clsx"
import { LoaderIcon } from "lucide-react"
import { toast } from "sonner"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useAtom(companyAtom);
  const [isLoading, setIsLoading] = useState(true);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
  })

  useEffect(() => {
    (async () => {
      try {
        const { data: companyListData } = await getCompanyList()
        if(companyListData){
          const companyList = companyListData.map((item: {
            companyid: string,
            companyname: string,
            fullname: string,
            email: string
            admins: {
              userid: string,
              email: string,
              fullname: string,
            }[]
          }) => {
            return {
              id: item.companyid,
              name: item.companyname,
              fullname: item.admins[0]?.fullname ?? "-",
              email: item.admins[0]?.email ?? "-"
            }
          })
          setData(companyList)
        }
      }
      catch(e: any) {
        toast.error(e.message)
      }
      finally {
        setIsLoading(false);
      }
    })()
	}, []);

  return (    
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <TableHead key={header.id} className={clsx(header.column.columnDef.meta?.headerClassName ?? "")}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {
            isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <LoaderIcon className="animate-spin m-auto" />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}
