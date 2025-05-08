/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { keywordsAtom } from "../atoms";
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
import { RoleEnum } from "@/lib/moduleconstants";
import { CompanyCombobox } from "../../manage-user/components/company-combobox";
import { addKeyword } from "@/services/keywords-service";
import { Keyword } from "./columns";

export function AddKeywordDialog(props: any) {
  const { role } = props;
  const [keywords, setKeywords] = useAtom(keywordsAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddKeyword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget ?? null)
    const keyword = formData.get("keyword") as string
    const companyid = formData.get("companyid") as string
    try {
      const { data } = await addKeyword({
        keyword: keyword,
        companyid: companyid,
      });
      const newdata: any = [...keywords, data as Keyword];
      setKeywords(newdata);
      setShowDialog(false);
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
        <Button><CirclePlus />Register New Keyword</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px]">
        <form onSubmit={handleAddKeyword}>
          <DialogHeader>
            <DialogTitle>Register New Keyword</DialogTitle>
            <DialogDescription>
              Input the keyword
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Keyword
              </Label>
              <Input
                placeholder="Company name or domain"
                name="keyword"
                defaultValue=""
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            { role == RoleEnum.SuperAdmin && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Company
                </Label>
                <div className="col-span-3">
                  <CompanyCombobox/>
                </div>
              </div>
            )}
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
