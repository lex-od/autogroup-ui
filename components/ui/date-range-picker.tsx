"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DateRange {
  from: string
  to: string
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  className?: string
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ value, onChange, placeholder = "Выберите период", className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [tempFrom, setTempFrom] = React.useState(value?.from || '')
    const [tempTo, setTempTo] = React.useState(value?.to || '')

    React.useEffect(() => {
      setTempFrom(value?.from || '')
      setTempTo(value?.to || '')
    }, [value])

    const handleApply = () => {
      if (onChange) {
        onChange({ from: tempFrom, to: tempTo })
      }
      setIsOpen(false)
    }

    const handleClear = () => {
      setTempFrom('')
      setTempTo('')
      if (onChange) {
        onChange({ from: '', to: '' })
      }
      setIsOpen(false)
    }

    const formatDisplayText = () => {
      if (!value?.from && !value?.to) {
        return placeholder
      }
      
      const fromDate = value?.from ? new Date(value.from).toLocaleDateString('ru-RU') : ''
      const toDate = value?.to ? new Date(value.to).toLocaleDateString('ru-RU') : ''
      
      if (fromDate && toDate) {
        return `${fromDate} - ${toDate}`
      } else if (fromDate) {
        return `с ${fromDate}`
      } else if (toDate) {
        return `до ${toDate}`
      }
      
      return placeholder
    }

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !value?.from && !value?.to && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayText()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="text-sm font-medium">Выберите период</div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">Дата с</label>
                <Input
                  type="date"
                  value={tempFrom}
                  onChange={(e) => setTempFrom(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">Дата по</label>
                <Input
                  type="date"
                  value={tempTo}
                  onChange={(e) => setTempTo(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleClear}>
                Очистить
              </Button>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>
                <Button size="sm" onClick={handleApply}>
                  Применить
                </Button>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker, type DateRange } 