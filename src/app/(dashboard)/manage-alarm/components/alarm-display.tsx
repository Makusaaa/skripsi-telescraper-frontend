/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { format } from "date-fns/format"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Copy } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
interface AlarmDisplayProps {
  alarm: any | null
}

export function MailDisplay({ alarm }: AlarmDisplayProps) {
  const [status, setStatus] = useState(alarm?.status);

  useEffect(() => {
    if(alarm){
      setStatus(alarm.status);
    }
	}, [alarm, status]);

  return (
    <div className="flex h-full flex-col">
      {alarm ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={alarm.channelname} />
                <AvatarFallback>
                  {alarm.channelname
                    .split(" ")
                    .map((chunk: any) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{alarm.channelname}</div>
                <div className="line-clamp-1 text-xs">{alarm.filename}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium mr-1">
                    URL: 
                  </span>
                  <a target="_blank" href={`https://t.me/${alarm.channeluserid}/${alarm.messageid}`}>
                    {`https://t.me/${alarm.channeluserid}/${alarm.messageid}`}
                  </a>
                </div>
              </div>
            </div>
            {alarm.discoverydate && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(alarm.discoverydate), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex flex-col items-start gap-2 rounded-lg border m-4 p-3 text-left text-sm transition-all">
            <div className="flex items-start p-2 gap-8">
              <div className="flex flex-col gap-1">
                <div className="font-semibold">Alarm ID</div>
                <div className="flex items-center gap-1 min-w-[75px] mb-auto py-1">
                  <span className="text-xs text-muted-foreground font-medium">56010559</span>
                  <Copy className="w-3 h-3 text-gray-500 cursor-pointer hover:text-gray-700" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">Company</div>
                <div className="flex items-center gap-1 min-w-[75px] mb-auto py-1">
                  <span className="text-xs text-muted-foreground font-medium">{alarm.companyname}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">Status</div>
                <Select value={status?.toString() ?? ""} onValueChange={setStatus}>
                  <SelectTrigger className="h-2 text-xs px-2 py-0" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    <SelectItem value="0">Open</SelectItem>
                    <SelectItem value="1">On Progress</SelectItem>
                    <SelectItem value="2">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">Assigned To</div>
                <Button variant="outline" className="bg-yellow-400/20 text-yellow-700 text-xs px-2 py-1 h-auto rounded-md">
                  Open
                </Button>
              </div>
            </div>
            <Separator/>
            <div className="p-2 gap-8 w-full">
              <div className="font-semibold mb-2">
                Leaked Credentials
              </div>
              <DataTable columns={columns} data={alarm.credentials}/>
            </div>
          </div>
          
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${alarm.channelname}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 mt-40 text-center text-muted-foreground">
          No alarm selected
        </div>
      )}
    </div>
  )
}
