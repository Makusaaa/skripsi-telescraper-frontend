/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns/format"
import { ArrowUpRight } from "lucide-react"
import { StatusDropDownList } from "./status-ddl"
import Link from "next/link"

export type Keyword = {
  credentialexposureid: string
  url: string
  login: string
  discoverydate: string
  password: string
  status: string
  alarmid: string
}
const colHelper = createColumnHelper<Keyword>();
export const columns: ColumnDef<Keyword>[] = [
  {
    accessorKey: "credentialexposureid",
    header: "ID",
    meta: {
      headerClassName: "w-10 text-center",
    },
    cell: (d: any) => (<div className="text-center w-full">{d.getValue()}</div>),
  },
  {
    accessorKey: "login",
    header: "Login",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "password",
    header: "Password",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "discoverydate",
    header: "Discovery Date",
    cell: (d) => (format(new Date(d.getValue() as string), "PPpp")),
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (d) => (<StatusDropDownList status={Number(d.getValue())} credentialexposureid={Number(d.row.original.credentialexposureid)}/>),
  },
  colHelper.display({
    id: 'action',
    header: "Alarm ID",
    cell: (d) => (
      <Link passHref
        href={`/manage-alarm?id=${d.row.original.alarmid}`}
        className="flex items-center justify-center text-xs border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-6 rounded-md gap-0.5 w-full"
      >
        {d.row.original.alarmid}
        <ArrowUpRight className="h-3 w-3"/>
      </Link>
    ),
  })
]
