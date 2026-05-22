import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { LiveTrackingStrip } from './LiveTrackingStrip'
import { mockLiveVisits } from '../data'

export function LiveMonitor() {
  const { t } = useTranslation()

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-slate-900">{t("dashboard.active_cases_tracking")}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {mockLiveVisits.map(visit => (
          <LiveTrackingStrip 
            key={visit.id}
            visit={visit}
          />
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-4">
          <div className="text-xs font-semibold text-slate-400">
            {t("common.page_of", { current: 1, total: 5 })}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-slate-100 text-slate-400 hover:text-primary hover:bg-primary/5">
              <ChevronRight className="rotate-180" size={16} />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-slate-100 text-slate-400 hover:text-primary hover:bg-primary/5">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
