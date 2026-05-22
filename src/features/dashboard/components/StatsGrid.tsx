import { TrendingUp, Clock, CheckCircle2, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatCard } from './StatCard'

export function StatsGrid() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
      <StatCard 
        title={t("dashboard.new_patient_leads")}
        value="12"
        trend="+14%"
        icon={<TrendingUp className="text-emerald-500" size={18} />}
        type="emerald"
      />
      <StatCard 
        title={t("dashboard.evaluations_scheduled")}
        value="8"
        trend={t("dashboard.eval_next", { time: "45m" })}
        icon={<Clock className="text-primary" size={18} />}
        type="primary"
      />
      <StatCard 
        title={t("dashboard.active_patients")}
        value="142"
        trend="98% Comp."
        icon={<CheckCircle2 className="text-primary" size={18} />}
        type="primary"
      />
      <StatCard 
        title={t("dashboard.visits_completed")}
        value="340"
        trend="This week"
        icon={<Calendar className="text-slate-400" size={18} />}
        type="slate"
      />
    </div>
  )
}
