/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAtom } from "jotai"
import { userAtom } from "../atoms";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleEnum } from "@/lib/moduleconstants";
import { CompanyCombobox } from "./company-combobox";
import { addUser } from "@/services/users-service";
import { User } from "./columns";

export function AddUserDialog(props: any) {
  const { role } = props;
  const [users, setUsers] = useAtom(userAtom);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pickedRole, setPickedRole] = useState<string | null>(null)

  const handleAddUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget ?? null)
    const fullname = formData.get("fullname") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const companyid = formData.get("companyid") as string
    try {
      const { data } = await addUser({
        fullname: fullname,
        email: email,
        role: role,
        companyid: companyid,
      });
      const newdata: any = [...users, data as User];
      setUsers(newdata);
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
      onOpenChange={(open) => {
        setPickedRole(null)
        setShowDialog(open)
      }}>
      <DialogTrigger asChild>
        <Button><CirclePlus />Register New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px]">
        <form onSubmit={handleAddUser}>
          <DialogHeader>
            <DialogTitle>Register New User</DialogTitle>
            <DialogDescription>
              Input the user&#39;s profile
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Fullname
              </Label>
              <Input
                placeholder="Enter username"
                name="fullname"
                defaultValue=""
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                placeholder="example@gmail.com"
                name="email"
                defaultValue=""
                className="col-span-3"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <div className="col-span-3">
                <Select
                  onValueChange={setPickedRole}
                  name="role"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      { role == RoleEnum.SuperAdmin && <SelectItem value="0">Super Admin</SelectItem>}
                      <SelectItem value="1">Company Admin</SelectItem>
                      <SelectItem value="2">Company User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            { role == RoleEnum.SuperAdmin && pickedRole != null && pickedRole != RoleEnum.SuperAdmin.toString() && (
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
