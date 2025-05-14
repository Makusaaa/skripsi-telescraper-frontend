"use server"
import { cookies } from "next/headers"
import { AlarmsPage } from "./components/alarm"
import { alarms } from "./data"

export default async function ManageAlarmPage() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail")
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  return (
    <>
      <div className="hidden flex-col md:flex">
        <AlarmsPage
          alarms={alarms}
          defaultLayout={defaultLayout}
        />
      </div>
    </>
  )
}