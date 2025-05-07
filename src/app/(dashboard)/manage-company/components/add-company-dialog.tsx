/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { companyAtom } from "../atoms";
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
import { addCompany } from "@/services/company-service"
import { CirclePlus, LoaderIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"

export function AddCompanyDialog() {
  const [companies, setCompany] = useAtom(companyAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget ?? null)
    const companyname = formData.get("companyname") as string
    const email = formData.get("email") as string
    const fullname = formData.get("fullname") as string
    try {
      const { data } = await addCompany({
        companyname: companyname,
        email: email,
        fullname: fullname
      });
      const newdata: any = [...companies, {
        id: data.newCompany.companyid,
        name: data.newCompany.companyname
      }];
      setCompany(newdata);
      setShowDialog(false);
    }
    catch(e: any) {
      toast.error(e.message)
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button><CirclePlus />Register New Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px]">
        <form onSubmit={handleAddCompany}>
          <DialogHeader>
            <DialogTitle>Register New Company</DialogTitle>
            <DialogDescription>
              Input the company&#39;s name
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Company Name
              </Label>
              <Input
                name="companyname"
                defaultValue=""
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <Separator />
            <DialogHeader>
              <DialogTitle>New Company Admin</DialogTitle>
              <DialogDescription>
                Create an account for the company&#39;s admin
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                name="email"
                defaultValue=""
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Fullname
              </Label>
              <Input
                name="fullname"
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
