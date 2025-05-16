"use client"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export default function ManageChannelPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <div className="flex items-center justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Channels</h2>
            <p className="text-muted-foreground">
              Join and leave telegram channels
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <AddKeywordDialog role={role}/> */}
          </div>
        </div>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}