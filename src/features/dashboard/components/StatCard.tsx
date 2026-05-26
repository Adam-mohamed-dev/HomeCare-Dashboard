import { Card } from "../../../components/ui/card"
import { cn } from "../../../lib/utils"
import type { DashboardStatus } from "../data"

interface StatCardProps {
  title: string
  value: string
  trend: string
  icon: React.ReactNode
  type: DashboardStatus
}

export function StatCard({ title, value, trend, icon, type }: StatCardProps) {
  const TREND_COLORS: Record<DashboardStatus, string> = {
    primary: "text-primary",
    emerald: "text-emerald-500",
    slate: "text-slate-400",
    success: "text-emerald-500",
    urgent: "text-red-500"
  }

  const trendColor = TREND_COLORS[type] || "text-slate-400"

  return (
    <Card className="rounded-[32px] p-8 border border-slate-50 shadow-sm shadow-slate-100/50 bg-white hover:shadow-md transition-all duration-300 group">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">{title}</span>
          <div className="opacity-20 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        </div>
        <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
          {value}
        </h3>
        <div className="flex items-center gap-2">
          <div className={cn("px-2 py-0.5 rounded-lg bg-current/5 text-[11px] font-bold", trendColor)}>
            {trend}
          </div>
        </div>
      </div>
    </Card>
  )
}
