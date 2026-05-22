import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar as CalendarIcon } from "lucide-react"
import type { ProviderProfileData } from "../../types"
import { mockEvents } from "../../data/mockProviderProfile"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { Button } from "../../../../components/ui/button"
import { ScheduleModal } from "../provider-sections/ScheduleModal"

interface AvailabilityCardProps {
  provider: ProviderProfileData
}

export function AvailabilityCard({ provider }: AvailabilityCardProps) {
  const { t } = useTranslation('translation')
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)

  const scheduleData = [
    { day: t("common.mon"), time: provider.availability.monday },
    { day: t("common.tue"), time: provider.availability.tuesday },
    { day: t("common.wed"), time: provider.availability.wednesday, highlight: provider.availability.wednesday.includes("Closed") },
    { day: t("common.thu"), time: provider.availability.thursday },
    { day: t("common.fri"), time: provider.availability.friday },
  ]

  return (
    <>
      <FormCard className="gap-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <CalendarIcon className="text-primary" size={20} />
            <h2 className="text-lg font-bold text-slate-800">{t("portfolio.availability")}</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {provider.availability.updatedAt}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {scheduleData.map((slot, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">{slot.day}</span>
              <span className={`text-sm font-medium ${slot.highlight ? 'text-primary' : 'text-slate-500'}`}>
                {slot.time}
              </span>
            </div>
          ))}
        </div>

        <Button 
          variant="secondary"
          className="w-full mt-2 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold gap-2"
          onClick={() => setIsScheduleOpen(true)}
        >
          <CalendarIcon size={16} />
          {t("portfolio.view_full_calendar")}
        </Button>
      </FormCard>

      <ScheduleModal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
        provider={{
          name: provider.fullName,
          discipline: provider.credentials,
          image: provider.photoUrl
        }}
        events={mockEvents}
      />
    </>
  )
}
