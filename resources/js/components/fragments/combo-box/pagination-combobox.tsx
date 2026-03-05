import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Button } from "../../ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command"
import { cn } from "@/lib/utils"

type ComboBoxProps = {
  value: string 
  onChange: (value: string) => void
}

export function PaginationCombobox({ value, onChange }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  const pageSizes = [
  { value: "5", label: "5 / halaman" },
  { value: "10", label: "10 / halaman" },
  { value: "25", label: "25 / halaman" },
  { value: "50", label: "50 / halaman" },
]


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
            ? pageSizes.find((s) => s.value === value)?.label
            : "Data / halaman"}
          <ChevronsUpDown className="opacity-100" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Cari jumlah..." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {pageSizes.map((size) => (
                <CommandItem
                  key={size.value}
                  value={size.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue) // 🔑 return ke parent
                    setOpen(false)
                  }}
                >
                  {size.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === size.value ? "opacity-100" : "opacity-0"
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