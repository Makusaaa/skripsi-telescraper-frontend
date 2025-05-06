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
import { CirclePlus } from "lucide-react"
import { useState } from "react"

export function AddCompanyDialog() {
  const [inputName, setInputName ] = useState("")
  const [companies, setCompany] = useAtom(companyAtom);
  const [showDialog, setShowDialog] = useState(false)

  const handleAddCompany = async () => {
    const { data } = await addCompany(inputName);
    const newdata = [...companies, {id: data.companyid, name: data.companyname}];
    setCompany(newdata as never);
    setShowDialog(false);
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button><CirclePlus />Register New Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register New Company</DialogTitle>
          <DialogDescription>
            Register your new company
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) => setInputName(e.target.value)}
              id="name"
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleAddCompany()} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
