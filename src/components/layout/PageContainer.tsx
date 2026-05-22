import React from "react"
import { cn } from "../../lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  size?: "narrow" | "standard" | "wide" | "full"
}

export function PageContainer({ 
  children, 
  className, 
  size = "standard" 
}: PageContainerProps) {
  const maxWidthClass = {
    narrow: "max-w-4xl mx-auto",
    standard: "max-w-7xl mx-auto",
    wide: "max-w-[1600px] mx-auto",
    full: "w-full"
  }[size]

  return (
    <div className={cn(
      "w-full px-4 sm:px-8 pb-20 animate-in fade-in duration-500",
      maxWidthClass,
      className
    )}>
      {children}
    </div>
  )
}
