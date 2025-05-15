/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateAlarmNotes } from "@/services/alarms-service";
import { LoaderIcon, Pencil, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { alarmListAtom, useAlarm } from "../use-alarm";
import { useAtom } from "jotai";

export function AlarmNotes(props: any) {
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alarm] = useAlarm()
  const [alarmList, setAlarmList] = useAtom(alarmListAtom);
  const inputRef: any = useRef(null);
  const { alarm: currentAlarm } = props
  const [notes, setNotes] = useState(currentAlarm.notes ?? "")
  
  const handleNotesButtonClick = async () => {
    if(editMode && (currentAlarm?.notes ?? "") != notes){
      setIsLoading(true)
      try {
        const updatedAlarm = await updateAlarmNotes({
          alarmid: alarm.selected,
          notes: notes,
        });
        const currentAlarm = alarmList.find((a) => a.alarmid == alarm.selected);
        setAlarmList(alarmList.map((d:any) => { return d.alarmid == alarm.selected ? {...currentAlarm, notes: updatedAlarm.data.notes} : d }))
        setEditMode(!editMode);
        toast.success("Successfully updated alarm notes!");
      }
      catch(e: any) {
        toast.error(e.message);
      }
      setIsLoading(false)
    }
    else{
      setEditMode(!editMode);
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    setNotes(currentAlarm.notes ?? "")
  }, [currentAlarm.notes]);

  return (
    <div className="px-2 gap-8 w-full">
      <div className="flex items-center mb-2 gap-3">
        <Button
          variant="outline"
          className="h-8 p-0"
          onClick={() => handleNotesButtonClick()}
        >
          {isLoading ? (
            <LoaderIcon className="animate-spin m-auto h-2 w-2" />
          ) : (
            <>
              {editMode ? ("Save Notes") : "Notes"}
              {editMode ? <Save className="w-3 h-3"/> : <Pencil className="w-3 h-3"/>}
            </>
          )}
        </Button>
      </div>
      <div className="grid gap-4">
        <Textarea
          className="p-4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Click the button with pencil icon to add or edit notes!"
          disabled={!editMode}
          ref={inputRef}
        />
      </div>
    </div>
  )
}