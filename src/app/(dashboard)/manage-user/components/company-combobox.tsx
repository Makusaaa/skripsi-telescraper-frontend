/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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
import { getCompanyList } from "@/services/company-service"

export function CompanyCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [companies, setCompanies] = useState<{
    value: string,
    label: string,
  }[]>([])

  useEffect(() => {
    (async () => {
      try {
        const { data: companyListData } = await getCompanyList()
        if(companyListData){
          const companyList = companyListData.map((item: any) => {
            return {
              value: `${item.companyid}`,
              label: item.companyname,
            }
          })
          setCompanies(companyList)
        }
      }
      catch(e: any) {
        toast.error(e.message)
      }
    })()
	}, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? companies.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <input type="hidden" name="companyid" value={value} />
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command
          filter={(_value, search, keywords = []) => {
            if (keywords.join(" ").toLowerCase().includes(search.toLowerCase()))
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {companies.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  keywords={[framework.label]}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
