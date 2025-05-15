/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { alarmListAtom, useAlarm } from "../use-alarm"
import { useEffect, useState } from "react"
import { getAlarmList } from "@/services/alarms-service"
import { toast } from "sonner"
import { LoaderIcon } from "lucide-react"
import { StatusEnum } from "@/lib/moduleconstants"
import { Session } from "@/lib/apiclient"
import { useAtom } from "jotai"

interface AlarmProps {
  defaultLayout: number[] | undefined
  session: Session
}

export function AlarmsPage({
  defaultLayout = [20, 32, 48],
  session
}: AlarmProps) {
  const [alarm] = useAlarm()
  const [alarms, setAlarms] = useAtom(alarmListAtom)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        setAlarms([]);
        const { data: alarmList } = await getAlarmList()
        if(alarmList){
          setAlarms(alarmList.map((a: any) => ({
            ...a,
            text: `Found leaked credentials on channel https://t.me/${a.channeluserid}/${a.messageid}`,
          })))
        }
      }
      catch(e: any) {
        toast.error(e.message)
      }
      finally {
        setIsLoading(false);
      }
    })()
	}, [setAlarms]);

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
                    value="assigned"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Assigned to me
                  </TabsTrigger>
                </TabsList>
            </div>
            <Separator />
            {isLoading && <LoaderIcon className="animate-spin mx-auto mt-15" />}
            <TabsContent value="all" className="m-0">
              <AlarmList items={alarms} />
            </TabsContent>
            <TabsContent value="open" className="m-0">
              <AlarmList items={alarms.filter((item) => item.status == StatusEnum.Open)} />
            </TabsContent>
            <TabsContent value="closed" className="m-0">
              <AlarmList items={alarms.filter((item) => item.status == StatusEnum.Closed)} />
            </TabsContent>
            <TabsContent value="assigned" className="m-0">
              <AlarmList items={alarms.filter((item) => item.assignto == session.userid)} />
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