import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { Clock, Navigation } from "lucide-react"
import { Card } from "../../../components/ui/card"
import { cn } from "../../../lib/utils"
import type { LiveVisit } from "../data.ts"

interface LiveTrackingStripProps {
  visit: LiveVisit
}

export function LiveTrackingStrip({ visit }: LiveTrackingStripProps) {
  const { t } = useTranslation('translation')
  const { patient, provider, time, statusKey, statusType, progress } = visit

  const theme = {
    primary: { text: "text-primary", bg: "bg-primary", border: "border-primary/20" },
    success: { text: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500/20" },
    urgent: { text: "text-red-500", bg: "bg-red-500", border: "border-red-500/30" }
  }[statusType as "primary" | "success" | "urgent"] || { text: "text-slate-500", bg: "bg-slate-500", border: "border-slate-500/20" }

  const colors = theme.text
  const bgColors = theme.bg
  const borderColors = theme.border

  return (
    <Card className={cn(
      "rounded-[32px] p-6 border-2 shadow-sm shadow-slate-200/40 bg-white group hover:shadow-xl transition-all duration-500 relative overflow-hidden",
      borderColors
    )}>
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

        {/* Provider Profile */}
        <Link
          to="/providers/$providerId"
          params={{ providerId: provider.id }}
          className="flex items-center gap-4 min-w-[180px] group/provider transition-all hover:translate-x-1"
        >
          <div className="relative">
            <img src={provider.image} className="w-12 h-12 rounded-[20px] object-cover ring-2 ring-white shadow-md transition-all group-hover/provider:ring-primary/20" />
            <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white", bgColors)} />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="text-sm font-bold text-slate-900 group-hover/provider:text-primary transition-colors truncate">{provider.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-medium text-slate-500 tabular-nums">{provider.phone}</span>
            </div>
          </div>
        </Link>

        {/* The Connection Strip (Middle) */}
        <div className="flex-1 flex flex-col items-center gap-3 w-full px-2">
          <div className="flex items-center justify-between w-full">
            <span className={cn("text-[10px] font-extrabold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-slate-50 whitespace-nowrap", colors)}>
              {t(statusKey as any)}
            </span>
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-xl">
              <Clock size={14} className="text-slate-300" />
              <span className={cn("text-xl sm:text-2xl font-bold tabular-nums whitespace-nowrap tracking-tight", colors)}>{time}</span>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full relative overflow-hidden">
            <div
              className={cn("absolute h-full transition-all duration-1000 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]", bgColors)}
              style={{ width: `${progress}%` }}
            />
            {statusType !== 'success' && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000"
                style={{ left: `${progress}%` }}
              >
                <div className={cn("p-1 rounded-full bg-white shadow-sm", colors)}>
                  <Navigation size={10} className="rotate-90" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Patient Profile */}
        <div className="flex items-center gap-4 min-w-[180px] justify-end text-right">
          <div className="flex flex-col min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">{patient.name}</h4>
            <div className="flex items-center gap-2 justify-end mt-0.5">
              <span className="text-[10px] font-medium text-slate-500 tabular-nums">{patient.phone}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-[20px] bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100 shrink-0">
            {patient.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
        </div>

      </div>
    </Card>
  )
}
