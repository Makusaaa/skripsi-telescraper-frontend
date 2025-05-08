/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { keywordsAtom } from "../atoms";
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
import { deleteKeyword } from "@/services/keywords-service";
import { toast } from "sonner"
import { useState } from "react";

export function AlertDialogButton(props: any) {
  const [keywords, setKeywords] = useAtom(keywordsAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteKeyword = async (keywordid: string) => {
    setIsLoading(true);
    try {
      await deleteKeyword(keywordid);
      setKeywords(keywords.filter((keyword: any) => keyword.keywordid !== keywordid));
      setShowDialog(false);
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
            keyword and remove all its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="w-22"
            disabled={isLoading}
            onClick={() => handleDeleteKeyword(props.keywordid)}>
            { isLoading ? <LoaderIcon className="animate-spin m-auto" /> : "Continue" }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  