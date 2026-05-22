import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { ActivityItem } from './ActivityItem'
import { mockActivities } from '../data'
import { getActivityConfig } from '../utils/activityHelpers'

export function ActivityFeed() {
  const { t } = useTranslation()

  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-slate-900">{t("dashboard.recent_activity")}</h2>
      <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        {mockActivities.map(activity => {
          const { icon, bg } = getActivityConfig(activity.type)
          return (
            <ActivityItem 
              key={activity.id}
              icon={icon}
              iconBg={bg}
              title={t(activity.titleKey, activity.titleParams) as string}
              subtitle={t(activity.subtitleKey, activity.subtitleParams) as string}
            />
          )
        })}
        <Button variant="ghost" className="w-full text-primary font-bold hover:bg-primary/5 rounded-xl h-12 text-sm uppercase tracking-widest transition-all">
          {t("dashboard.view_all_activity")}
        </Button>
      </div>
    </div>
  )
}
