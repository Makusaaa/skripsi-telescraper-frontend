/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { channelsAtom } from "../atoms";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { LoaderIcon, Trash } from "lucide-react"
import { leaveChannel } from "@/services/channels-service";
import { toast } from "sonner"
import { useState } from "react";

export function AlertDialogButton(props: any) {
  const [channels, setChannels] = useAtom(channelsAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLeaveChannel = async (channelid: string) => {
    setIsLoading(true);
    try {
      await leaveChannel(channelid);
      setChannels(channels.filter((channel: any) => channel.channeluserid !== channelid));
      setShowDialog(false);
      toast.success("Sucessfully left channel!");
    }
    catch(e: any) {
      toast.error(e.message);
    }
    setIsLoading(false);
  }

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog} >
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm"><Trash /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            channel and remove all its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="w-22"
            disabled={isLoading}
            onClick={() => handleLeaveChannel(props.channelid)}>
            { isLoading ? <LoaderIcon className="animate-spin m-auto" /> : "Continue" }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  