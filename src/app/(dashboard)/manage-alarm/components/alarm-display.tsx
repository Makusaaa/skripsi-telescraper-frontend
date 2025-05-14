/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface AlarmDisplayProps {
  alarm: any | null
}

export function MailDisplay({ alarm }: AlarmDisplayProps) {
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
                  <span className="font-medium">
                    Link:
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
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {alarm.text}
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
