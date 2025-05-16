/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import { StatusBadge } from "../../manage-alarm/components/status-badge"
import { StatusEnum } from "@/lib/moduleconstants"
import { format } from "date-fns/format"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { AlertDialogButton } from "./alert-dialog-button"

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
    cell: (d) => (<StatusBadge status={d.getValue() as StatusEnum}/>),
  },
  colHelper.display({
    id: 'action',
    header: "Alarm ID",
    cell: (d) => (
      <Button
        size="sm"
        className="flex items-center"
        variant="outline"
      >
        {d.row.original.alarmid}
        <ArrowUpRight className="h-4 w-4"/>
      </Button>
    ),
  })
]
