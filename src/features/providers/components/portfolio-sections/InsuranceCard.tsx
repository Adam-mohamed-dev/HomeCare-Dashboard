import { useTranslation } from "react-i18next"
import { Shield, CheckCircle2 } from "lucide-react"
import type { ProviderProfileData } from "../../types"
import { FormCard } from "../../../../components/onboarding/FormCard"

interface InsuranceCardProps {
  provider: ProviderProfileData
}

export function InsuranceCard({ provider }: InsuranceCardProps) {
  const { t } = useTranslation()

  return (
    <FormCard className="gap-6">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <Shield className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-800">{t("portfolio.insurance")}</h2>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {t("portfolio.accepted_insurance")}
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {provider.insurance.map((network, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100"
            >
              <span className="text-sm font-bold text-slate-700">{network}</span>
              <CheckCircle2 size={16} className="text-primary" />
            </div>
          ))}
        </div>
      </div>
    </FormCard>
  )
}
