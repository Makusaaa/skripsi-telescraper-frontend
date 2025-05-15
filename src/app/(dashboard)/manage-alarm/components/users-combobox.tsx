/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getUserListByCompanyID } from "@/services/users-service"
import { useAtom } from "jotai"
import { alarmListAtom, useAlarm } from "../use-alarm"
import { updateAlarmAssignTo } from "@/services/alarms-service"

export function UsersCombobox(props: any) {
  const { alarm: currentAlarm } = props;
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [alarm] = useAlarm()
  const [alarmList, setAlarmList] = useAtom(alarmListAtom);
  const [users, setUsers] = useState<{
    value: string,
    label: string,
  }[]>([])

  useEffect(() => {
    (async () => {
      try {
        setValue(currentAlarm.assignto?.toString() ?? "")
        const { data: userListData } = await getUserListByCompanyID(currentAlarm.companyid)
        if(userListData){
          const userList = userListData.map((item: any) => {
            return {
              value: `${item.userid}`,
              label: item.fullname,
            }
          })
          setUsers(userList)
        }
      }
      catch(e: any) {
        toast.error(e.message)
      }
      setIsLoading(false)
    })()
	}, [currentAlarm.companyid, currentAlarm.assignto]);

  const handleAssignToChange = async (currentValue: string) => {
    setIsLoading(true)
    setOpen(false)
    try {
      const newAssignment = currentValue === value ? "" : currentValue;
      const updatedAlarm = await updateAlarmAssignTo({
        alarmid: alarm.selected,
        assignto: newAssignment == "" ? null : +newAssignment,
      });
      const currentAlarm = alarmList.find((a) => a.alarmid == alarm.selected);
      setAlarmList(alarmList.map((d:any) => { return d.alarmid == alarm.selected ? {...currentAlarm, assignto: updatedAlarm.data.assignto} : d }))
      setValue(newAssignment)
      toast.success("Successfully updated alarm assignment!");
    }
    catch(e: any) {
      toast.error(e.message);
    }
    setIsLoading(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-6 text-xs font-normal p-1"
        >
          {
            isLoading ? (
              <LoaderIcon className="animate-spin m-auto h-2 w-2" />
            )
            : (
              value ? (
                users.find((user) => user.value === value)?.label ?? currentAlarm.assigneduser.fullname
              ) : "Select User"
            )
          }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <input type="hidden" name="userid" value={value} />
      <PopoverContent className="w-full p-0">
        <Command
          filter={(_value, search, keywords = []) => {
            if (keywords.join(" ").toLowerCase().includes(search.toLowerCase()))
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.value}
                  value={user.value}
                  keywords={[user.label]}
                  onSelect={handleAssignToChange}
                >
                  {user.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === user.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
