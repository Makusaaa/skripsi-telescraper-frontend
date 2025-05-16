/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { channelsAtom } from "../atoms";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus, LoaderIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { joinChannel } from "@/services/channels-service";
import { Channel } from "./columns";

export function AddChannelDialog() {
  const [channels, setChannels] = useAtom(channelsAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddChannel = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget ?? null)
    const channeluserid = formData.get("channeluserid") as string
    try {
      const { data } = await joinChannel({
        channeluserid: channeluserid,
      });
      const checkChannel = channels.find((c: any) => c.channeluserid == data.channeluserid)
      if(!checkChannel){
        setChannels([...channels, data as Channel]);
      }
      setShowDialog(false);
      toast.success("Sucessfully added new channel!");
    }
    catch(e: any) {
      toast.error(e.message)
    }
    setIsLoading(false)
  }

  return (
    <Dialog
      open={showDialog}
      onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button><CirclePlus />Add New Channel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px]">
        <form onSubmit={handleAddChannel}>
          <DialogHeader>
            <DialogTitle>Add Telegram Channel</DialogTitle>
            <DialogDescription>
              Input the telegram channel id
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Channel ID
              </Label>
              <Input
                placeholder="Channel ID"
                name="channeluserid"
                defaultValue=""
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit" className="w-30">
              { isLoading ? <LoaderIcon className="animate-spin m-auto" /> : "Save changes" }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
