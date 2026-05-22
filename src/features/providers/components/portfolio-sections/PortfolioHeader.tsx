import { useTranslation } from "react-i18next"
import { Mail, Phone, MoreHorizontal, ShieldCheck } from "lucide-react"
import type { ProviderProfileData } from "../../types"
import { cn } from "../../../../lib/utils"

interface PortfolioHeaderProps {
  provider: ProviderProfileData
}

export function PortfolioHeader({ provider }: PortfolioHeaderProps) {
  const { t } = useTranslation('translation')

  return (
    <div className="bg-slate-50/50 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 w-full">
        <div className="relative shrink-0">
          <img 
            src={provider.photoUrl} 
            alt={provider.fullName} 
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-[20px] sm:rounded-[24px] object-cover shadow-sm border-4 border-white"
          />
          <div className={cn(
            "absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-wider border-2 border-white whitespace-nowrap shadow-sm",
            provider.status === "ACTIVE" 
              ? "bg-status-active text-status-active-text" 
              : "bg-slate-200 text-slate-500"
          )}>
            {provider.status === "ACTIVE" ? t("common.active").toUpperCase() : t("common.inactive").toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {provider.fullName}, {provider.credentials}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 font-medium text-sm sm:text-base">
              <ShieldCheck size={16} className="text-slate-400" />
              <span>{provider.title}</span>
            </div>
          </div>

          {/* Responsive Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-12 w-full pt-2">
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("common.npi_number")}</span>
              <span className="text-sm font-semibold text-slate-700">{provider.npiNumber}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("portfolio.taxonomy")}</span>
              <span className="text-sm font-semibold text-slate-700">{provider.taxonomy}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("portfolio.direct_phone")}</span>
              <span className="text-sm font-semibold text-slate-700 tabular-nums">{provider.directPhone}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("common.email")}</span>
              <span className="text-sm font-semibold text-slate-700 break-all">{provider.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all">
          <Mail size={18} />
        </button>
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all">
          <Phone size={18} />
        </button>
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  )
}
