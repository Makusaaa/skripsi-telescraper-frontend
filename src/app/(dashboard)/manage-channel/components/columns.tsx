/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"

export type Channel = {
  channelid: string
  channelnumber: string
  channelname: string
  channeluserid: string
}
const colHelper = createColumnHelper<Channel>();
export const columns: ColumnDef<Channel>[] = [
  {
    accessorKey: "channelid",
    header: "ID",
    meta: {
      headerClassName: "w-10 text-center",
    },
    cell: (d: any) => (<div className="text-center w-full">{d.getValue()}</div>),
  },
  {
    accessorKey: "channelname",
    header: "Name",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "channelnumber",
    header: "Number",
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  {
    accessorKey: "channeluserid",
    header: "Link",
    cell: (d: any) => (<a href={`https://t.me/${d.getValue()}`} target="_blank" className="w-full">{`https://t.me/${d.getValue()}`}</a>),
    meta: {
      headerClassName: "max-w-80 text-left",
    },
  },
  colHelper.display({
    id: 'action',
    header: () => <div className="text-right"></div>,
    cell: () => (
      <></>
      // <div className="text-right"><AlertDialogButton keywordid={d.row.original.keywordid} /></div>
    ),
  })
]
