"use server"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarBreadcrumb } from "./components/breadcrumb"
import { getSession } from "@/lib/apiclient"
import { Suspense } from "react"
import Loading from "./loading"

export default async function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getSession();
    return (
      <SidebarProvider>
        <AppSidebar session={session}/>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <SidebarBreadcrumb />
            </div>
          </header>
          <Separator />
          <Suspense fallback={ <Loading />} >
            {children}
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    )
  }