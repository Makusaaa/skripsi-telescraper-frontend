"use client"

import * as React from "react"
import {
  Command,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModuleSidebarItems } from "@/lib/moduleconstants"
import { Session } from "@/lib/apiclient"
import { signOut } from "next-auth/react"

const data = ModuleSidebarItems;

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  session?: Session
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { session } = props;
  const logOutOfApp = () => {
    (async () => {
      await signOut({ callbackUrl: "/"})
    })();
  }
  if(!session){
    logOutOfApp();
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Tarsius</span>
                  <span className="truncate text-xs">Monitoring Tool</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} session={session!} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session!} />
      </SidebarFooter>
    </Sidebar>
  )
}
