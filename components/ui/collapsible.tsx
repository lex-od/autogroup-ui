"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextType | null>(null)

const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error("useCollapsible must be used within a Collapsible")
  }
  return context
}

interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open = false, onOpenChange, children, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open)

    React.useEffect(() => {
      setIsOpen(open)
    }, [open])

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        setIsOpen(newOpen)
        onOpenChange?.(newOpen)
      },
      [onOpenChange]
    )

    const contextValue = React.useMemo(
      () => ({ open: isOpen, onOpenChange: handleOpenChange }),
      [isOpen, handleOpenChange]
    )

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ onClick, className, ...props }, ref) => {
    const { open, onOpenChange } = useCollapsible()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onOpenChange(!open)
      onClick?.(event)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={className}
        {...props}
      />
    )
  }
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open } = useCollapsible()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent } 