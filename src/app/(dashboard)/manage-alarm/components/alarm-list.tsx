/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAlarm } from "../use-alarm"
import { Badge } from "@/components/ui/badge"
import { ComponentProps } from "react"

interface AlarmListProps {
  items: any[]
}

export function AlarmList({ items }: AlarmListProps) {
  const [alarm, setAlarm] = useAlarm()

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.alarmid}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              alarm.selected === item.alarmid && "bg-muted"
            )}
            onClick={() =>
              setAlarm({
                ...alarm,
                selected: item.alarmid,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.channelname}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    alarm.selected === item.alarmid
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.discoverydate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.filename}</div>
            </div>
            <div className="flex items-center">
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.text.substring(0, 300)}
              </div>
              <div className="ml-auto mt-auto">
                {item.labels.length ? (
                  <div className="flex items-center gap-2">
                    {item.labels.map((label: any) => (
                      <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            
            
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["open"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["closed"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}