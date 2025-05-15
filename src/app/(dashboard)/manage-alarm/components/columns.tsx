/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { StatusEnum, StatusName } from "@/lib/moduleconstants"
import { ColumnDef } from "@tanstack/react-table"

export type User = {
  credentialexposureid: string
  url: string
  login: string
  password: string
  status: string
}
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "credentialexposureid",
    header: "ID",
    meta: {
      headerClassName: "text-center",
    },
    cell: (d: any) => (<div className="text-center w-full">{d.getValue()}</div>)
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "login",
    header: "Login",
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: (d) => (d.getValue() ?? "-"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (d) => (StatusName[d.getValue() as StatusEnum]),
  },
]
