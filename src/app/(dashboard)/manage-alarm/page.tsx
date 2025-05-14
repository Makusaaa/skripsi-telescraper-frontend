"use server"
import { cookies } from "next/headers"
import { AlarmsPage } from "./components/alarm"
import { getSession } from "@/lib/apiclient"

export default async function ManageAlarmPage() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const session = await getSession();
  return (
    <>
      <div className="hidden flex-col md:flex">
        <AlarmsPage
          defaultLayout={defaultLayout}
          session={session}
        />
      </div>
    </>
  )
}