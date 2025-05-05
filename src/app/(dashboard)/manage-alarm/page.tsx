import { cookies } from "next/headers"
import { Mail } from "./components/mail"
import { mails } from "./data"

export default async function ManageAlarmPage() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          mails={mails}
          defaultLayout={defaultLayout}
        />
      </div>
    </>
  )
}