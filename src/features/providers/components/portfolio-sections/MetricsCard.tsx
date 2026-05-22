import { useTranslation } from "react-i18next"
import { BarChart3, Clock } from "lucide-react"
import type { ProviderProfileData } from "../../types"

interface MetricsCardProps {
  provider: ProviderProfileData
}

export function MetricsCard({ provider }: MetricsCardProps) {
  const { t } = useTranslation()
  const { metrics } = provider

  return (
    <div className="bg-brand-dark rounded-[32px] p-8 shadow-lg flex flex-col gap-8 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="flex items-center gap-3 pb-2 border-b border-white/10 relative z-10">
        <BarChart3 className="text-brand-light" size={20} />
        <h2 className="text-lg font-bold">{t("portfolio.metrics")}</h2>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-end justify-between">
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            {t("portfolio.utilization")}
          </span>
          <span className="text-3xl font-extrabold tracking-tight">
            {metrics.utilization}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-light rounded-full transition-all duration-1000"
            style={{ width: `${metrics.utilization}%` }}
          />
        </div>
        <span className="text-[10px] font-medium text-white/50">
          {metrics.utilizationText}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-white/5 rounded-2xl p-5 flex flex-col gap-2 border border-white/5">
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            {t("portfolio.caseload")}
          </span>
          <span className="text-2xl font-bold">
            {metrics.caseloadCurrent}<span className="text-lg text-white/40">/{metrics.caseloadMax}</span>
          </span>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-5 flex flex-col gap-2 border border-white/5">
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            {t("portfolio.pay_rate")}
          </span>
          <span className="text-2xl font-bold">
            ${metrics.payRate}<span className="text-lg text-white/40">/hr</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-6 border-t border-white/10 relative z-10">
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5">
          <Clock size={12} /> {t("portfolio.avg_response_time")}
        </span>
        <span className="text-xl font-bold">
          {metrics.avgResponseTime} Hours
        </span>
      </div>
    </div>
  )
}
