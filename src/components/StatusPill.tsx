import { cn } from "../lib/utils"
import { Badge } from "./ui/badge"
import { useTranslation } from "react-i18next"

export type StatusType = "Lead" | "Active" | "Inactive"

interface StatusPillProps {
  status: StatusType | string
  className?: string
}

const STATUS_CONFIG: Record<string, { style: string, key: string }> = {
  lead: {
    style: "bg-primary text-white border-none shadow-none hover:bg-primary",
    key: "common.lead"
  },
  active: {
    style: "bg-status-active text-status-active-text border-none shadow-none hover:bg-status-active",
    key: "common.active"
  },
  inactive: {
    style: "bg-muted text-muted-foreground border-none shadow-none hover:bg-muted",
    key: "common.inactive"
  }
}

export function StatusPill({ status, className }: StatusPillProps) {
  const { t } = useTranslation()

  const normalizedStatus = status.toLowerCase()
  const config = STATUS_CONFIG[normalizedStatus] || {
    style: "bg-slate-100 text-slate-600 border-none shadow-none hover:bg-slate-100",
    key: `common.${normalizedStatus}`
  }

  return (
    <Badge 
      className={cn(
        "px-4 py-1 font-bold text-[11px] rounded-full min-w-20 justify-center cursor-default transition-none uppercase tracking-wider",
        config.style,
        className
      )}
    >
      {t(config.key, { defaultValue: status })}
    </Badge>
  )
}
