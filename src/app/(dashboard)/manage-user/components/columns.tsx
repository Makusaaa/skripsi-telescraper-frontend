/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { RoleEnum, RoleName } from "@/lib/moduleconstants"
import { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import { AlertDialogButton } from "./alert-dialog-button"

export type User = {
  userid: string
  fullname: string
  email: string
  companyname: string
  companyid: string
  role: string
}
const colHelper = createColumnHelper<User>();
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userid",
    header: "ID",
    meta: {
      headerClassName: "w-10 text-center",
    },
    cell: (d: any) => (<div className="text-center w-full">{d.getValue()}</div>)
  },
  {
    accessorKey: "fullname",
    header: "Fullname",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "companyname",
    header: "Company",
    cell: (d) => (d.getValue() ?? "-"),
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (d) => (RoleName[d.getValue() as RoleEnum]),
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  colHelper.display({
    id: 'action',
    header: () => <div className="text-right"></div>,
    cell: (d) => (
      <div className="text-right"><AlertDialogButton userid={d.row.original.userid} /></div>
    ),
  })
]
