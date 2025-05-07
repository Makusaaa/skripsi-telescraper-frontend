import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signOut, useSession } from "next-auth/react"
import { ClipboardIcon } from "lucide-react"
import Link from "next/link"

export function SignOutCard({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { data: session } = useSession() as unknown as { data: { id_token: string, authToken: string, user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }}};
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Signed in as {session?.user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-3">
              <div className="flex justify-between">
                <Button onClick={() => navigator.clipboard.writeText(session!.id_token)} variant="outline" className="flex-auto px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out" type="button">
                  <ClipboardIcon/>
                  Google JWT
                </Button>
                <Button onClick={() => navigator.clipboard.writeText(session!.authToken)} variant="outline" className="flex-auto px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out" type="button">
                  <ClipboardIcon/>
                  API JWT
                </Button>
              </div>
              <Link href={"/manage-alarm"}>
                <Button className="w-full flex-auto px-4 py-1 rounded-lg transition-colors duration-300 ease-in-out" type="button">
                  Enter App
                </Button>
              </Link>
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out" onClick={async () => await signOut()} type="button">
                  Sign Out
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}