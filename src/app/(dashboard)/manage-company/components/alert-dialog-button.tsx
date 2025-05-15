/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { companyAtom } from "../atoms";
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
import { deleteCompany } from "@/services/company-service";
import { toast } from "sonner"
import { useState } from "react";

export function AlertDialogButton(props: any) {
  const [companies, setCompany] = useAtom(companyAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCompany = async (companyid: string) => {
    setIsLoading(true);
    try {
      await deleteCompany(companyid);
      setCompany(companies.filter((company: any) => company.id !== companyid));
      setShowDialog(false);
      toast.success("Sucessfully deleted company!");
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
            company and remove all its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="w-22"
            disabled={isLoading}
            onClick={() => handleDeleteCompany(props.companyid)}>
            { isLoading ? <LoaderIcon className="animate-spin m-auto" /> : "Continue" }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  