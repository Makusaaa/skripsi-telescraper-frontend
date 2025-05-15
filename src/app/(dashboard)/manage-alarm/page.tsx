"use server"
import { AlarmsPage } from "./components/alarm"
import { getSession } from "@/lib/apiclient"

export default async function ManageAlarmPage() {
  const session = await getSession();
  return (
    <>
      <div className="hidden flex-col md:flex">
        <AlarmsPage
          session={session}
        />
      </div>
    </>
  )
}