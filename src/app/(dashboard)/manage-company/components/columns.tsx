/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import { AlertDialogButton } from "./alert-dialog-button"

export type Company = {
  id: string
  name: string
}
const colHelper = createColumnHelper<Company>();
export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: "ID",
    meta: {
      headerClassName: "w-10 text-center",
    },
    cell: (d: any) => (<div className="text-center w-full">{d.getValue()}</div>)
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "fullname",
    header: "Admin Fullname",
  },
  {
    accessorKey: "email",
    header: "Admin Email",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  colHelper.display({
    id: 'action',
    header: () => <div className="text-right"></div>,
    cell: (d) => (
      <div className="text-right"><AlertDialogButton companyid={d.row.original.id} /></div>
    ),
  })
]
