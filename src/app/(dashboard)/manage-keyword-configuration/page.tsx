"use server"

import { getSession } from "@/lib/apiclient";
import { AddKeywordDialog } from "./components/add-keywords-dialog";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function ManageKeywordConfigurationPage() {
  const session = await getSession();
  const { role } = session;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <div className="flex items-center justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Keywords</h2>
            <p className="text-muted-foreground">
              Register and remove keywords
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <AddKeywordDialog role={role}/>
          </div>
        </div>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}