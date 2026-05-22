import { useTranslation } from "react-i18next"
import { Map } from "lucide-react"
import type { ProviderProfileData } from "../../types"
import { FormCard } from "../../../../components/onboarding/FormCard"

interface CoverageCardProps {
  provider: ProviderProfileData
}

export function CoverageCard({ provider }: CoverageCardProps) {
  const { t } = useTranslation()

  return (
    <FormCard className="gap-6">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <Map className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-800">{t("portfolio.coverage")}</h2>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {t("portfolio.zip_codes_covered")}
        </span>
        
        <div className="flex flex-wrap gap-2">
          {provider.coverage.zipCodes.map((zip, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 rounded-xl text-[13px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              {zip}
            </span>
          ))}
          {provider.coverage.additionalCount > 0 && (
            <span className="px-4 py-2 rounded-xl text-[13px] font-bold bg-slate-100 text-slate-500 border border-slate-200/60">
              +{provider.coverage.additionalCount} more
            </span>
          )}
        </div>
      </div>
    </FormCard>
  )
}
