/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAtom } from "jotai";
import { LoaderIcon } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";
import { credentialAtom } from "../atoms";
import { updateCredentialExposureStatus } from "@/services/credentialexposure-services";
import { cn } from "@/lib/utils";
import { StatusEnum } from "@/lib/moduleconstants";

interface StatusProps {
  status: number,
  credentialexposureid: number,
}

export function StatusDropDownList({ status, credentialexposureid }: StatusProps) {
  const [statusIsLoading, setStatusIsLoading] = useState(false);
  const [alarmList, setAlarmList] = useAtom(credentialAtom);  
  const handleStatusUpdate = async (value: string) => {
    setStatusIsLoading(true)
    try {
      const status = Number(value);
      const updatedCredentialExposure = await updateCredentialExposureStatus({
        credentialexposureid: credentialexposureid,
        status: status,
      });
      const currentCredential = alarmList.find((a) => a.credentialexposureid == credentialexposureid);
      setAlarmList(alarmList.map((d:any) => { return d.credentialexposureid == currentCredential.credentialexposureid ? {...currentCredential, status: updatedCredentialExposure.data.status} : d }))
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