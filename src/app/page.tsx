"use server"
import { Webhook } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { SignOutCard } from "@/components/sign-out-card";
import { getSession } from "@/lib/apiclient";

export default async function LoginPage() {
  const session = await getSession();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Webhook className="size-4" />
          </div>
          Tarsius
        </a>
        {session && (
          <SignOutCard session={session} />
        )}
        {!session && (
          <LoginForm />
        )}
      </div>
    </div>
  )
}