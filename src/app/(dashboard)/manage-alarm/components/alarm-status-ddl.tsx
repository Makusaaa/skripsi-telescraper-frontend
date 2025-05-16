/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAtom } from "jotai";
import { LoaderIcon } from "lucide-react"
import { useState } from "react";
import { alarmListAtom, useAlarm } from "../use-alarm";
import { toast } from "sonner";
import { updateAlarmStatus } from "@/services/alarms-service";
import { cn } from "@/lib/utils";
import { StatusEnum } from "@/lib/moduleconstants";

interface AlarmStatusProps {
  status: number
}

export function AlarmStatusDropDownList({ status }: AlarmStatusProps) {
  const [alarm] = useAlarm()
  const [statusIsLoading, setStatusIsLoading] = useState(false);
  const [alarmList, setAlarmList] = useAtom(alarmListAtom);  
  const handleStatusUpdate = async (value: string) => {
    setStatusIsLoading(true)
    try {
      const status = Number(value);
      const updatedAlarm = await updateAlarmStatus({
        alarmid: alarm.selected,
        status: status,
      });
      const currentAlarm = alarmList.find((a) => a.alarmid == alarm.selected);
      setAlarmList(alarmList.map((d:any) => { return d.alarmid == alarm.selected ? {...currentAlarm, status: updatedAlarm.data.status} : d }))
      toast.success("Successfully updated alarm's status")
    }
    catch(e: any) {
      toast.error(e.message);
    }
    setStatusIsLoading(false)
  }

  return (
    <Select
      value={status?.toString() ?? ""}
      onValueChange={handleStatusUpdate}
      disabled={statusIsLoading}
    >
      <SelectTrigger
        className={cn("h-2 text-xs px-2 py-0 font-semibold",
          status == StatusEnum.Open ? "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90"
        : status == StatusEnum.OnProgress ? "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90"
        : status == StatusEnum.Closed ? "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground" : "")}
        size="sm"
        isOpen={status == StatusEnum.Open}
      >
        <SelectValue/>
      </SelectTrigger>
      <SelectContent className="text-xs">
        <SelectItem value="0">{ statusIsLoading ? <LoaderIcon className="animate-spin m-auto h-2 w-2" /> : "Open" }</SelectItem>
        <SelectItem value="1">{ statusIsLoading ? <LoaderIcon className="animate-spin m-auto h-2 w-2" /> : "On Progress" }</SelectItem>
        <SelectItem value="2">{ statusIsLoading ? <LoaderIcon className="animate-spin m-auto h-2 w-2" /> : "Closed" }</SelectItem>
      </SelectContent>
    </Select>
  );
}