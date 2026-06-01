import { BarChart3, CalendarCheck, CalendarX, Activity } from "lucide-react"
import type { PatientProfileData } from "../../types"

interface MetricsCardProps {
  patient: PatientProfileData
}

export function MetricsCard({ patient }: MetricsCardProps) {
  const { visits } = patient

  return (
    <div className="bg-brand-dark rounded-[32px] p-8 shadow-lg flex flex-col gap-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="flex items-center gap-3 pb-2 border-b border-white/10 relative z-10">
        <BarChart3 className="text-brand-light" size={20} />
        <h2 className="text-lg font-bold">Visit Metrics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-white/5 rounded-2xl p-5 flex flex-col gap-2 border border-white/5">
          <CalendarCheck size={18} className="text-green-300" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            Scheduled
          </span>
          <span className="text-2xl font-bold">
            {visits.scheduled}
          </span>
        </div>

        <div className="bg-white/5 rounded-2xl p-5 flex flex-col gap-2 border border-white/5">
          <Activity size={18} className="text-brand-light" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            Completed
          </span>
          <span className="text-2xl font-bold text-green-300">
            {visits.completed}
          </span>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 flex flex-col gap-2 border border-white/5 relative z-10">
        <CalendarX size={18} className="text-red-300" />
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
          Missed
        </span>
        <span className="text-2xl font-bold text-red-300">
          {visits.missed}
        </span>
      </div>
    </div>
  )
}
