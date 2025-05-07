"use server"

import { getSession } from "@/lib/apiclient";
import { AddUserDialog } from "./components/add-user-dialog"

export default async function ManageUserPage() {
  const session = await getSession();
  const { role } = session;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <div className="flex items-center justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Register and remove users
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <AddUserDialog role={role}/>
          </div>
        </div>
        {/* <DataTable columns={columns} /> */}
      </div>
    </div>
  )
}