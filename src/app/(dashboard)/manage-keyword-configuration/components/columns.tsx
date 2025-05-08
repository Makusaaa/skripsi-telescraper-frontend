/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import { AlertDialogButton } from "./alert-dialog-button"

export type Keyword = {
  keywordid: string
  keyword: string
  companyid: string
  companyname: string
  userid: string
  userfullname: string
}
const colHelper = createColumnHelper<Keyword>();
export const columns: ColumnDef<Keyword>[] = [
  {
    accessorKey: "keywordid",
    header: "ID",
    meta: {
      headerClassName: "w-10 text-center",
    },
    cell: (d: any) => (<div className="text-center w-full">{d.getValue()}</div>),
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "companyname",
    header: "Company",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "userfullname",
    header: "Added by",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  colHelper.display({
    id: 'action',
    header: () => <div className="text-right"></div>,
    cell: (d) => (
      <div className="text-right"><AlertDialogButton keywordid={d.row.original.keywordid} /></div>
    ),
  })
]
