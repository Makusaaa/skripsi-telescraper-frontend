"use client"

import * as React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MailDisplay } from "./alarm-display"
import { AlarmList } from "./alarm-list"
import { type Alarm } from "../data"
import { useAlarm } from "../use-alarm"

interface AlarmProps {
  alarms: Alarm[]
  defaultLayout: number[] | undefined
}

export function AlarmsPage({
  alarms,
  defaultLayout = [20, 32, 48],
}: AlarmProps) {
  const [alarm] = useAlarm()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={30}
          maxSize={40}
          >
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 pt-3 pb-1">
              <h1 className="text-xl font-bold">Alarms</h1>
                <TabsList className="ml-auto">
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="open"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Open
                  </TabsTrigger>
                  <TabsTrigger
                    value="closed"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Closed
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Assigned to me
                  </TabsTrigger>
                </TabsList>
            </div>
            <Separator />
            <TabsContent value="all" className="m-0">
              <AlarmList items={alarms} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <AlarmList items={alarms.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay
            alarm={alarms.find((item) => item.alarmid === alarm.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}