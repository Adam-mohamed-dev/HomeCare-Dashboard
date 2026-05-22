import { cn } from "../lib/utils"
import { Badge } from "./ui/badge"
import { useTranslation } from "react-i18next"

export type StatusType = "Lead" | "Active" | "Inactive"

interface StatusPillProps {
  status: StatusType | string
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  const { t } = useTranslation()

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "lead":
        return "bg-primary text-white border-none shadow-none hover:bg-primary"
      case "active":
        return "bg-status-active text-status-active-text border-none shadow-none hover:bg-status-active"
      case "inactive":
        return "bg-muted text-muted-foreground border-none shadow-none hover:bg-muted"
      default:
        return "bg-slate-100 text-slate-600 border-none shadow-none hover:bg-slate-100"
    }
  }

  const getStatusKey = (status: string) => {
    switch (status.toLowerCase()) {
      case "lead": return "common.lead"
      case "active": return "common.active"
      case "inactive": return "common.inactive"
      default: return `common.${status.toLowerCase()}`
    }
  }

  return (
    <Badge 
      className={cn(
        "px-4 py-1 font-bold text-[11px] rounded-full min-w-20 justify-center cursor-default transition-none uppercase tracking-wider",
        getStatusStyles(status),
        className
      )}
    >
      {t(getStatusKey(status), { defaultValue: status })}
    </Badge>
  )
}
