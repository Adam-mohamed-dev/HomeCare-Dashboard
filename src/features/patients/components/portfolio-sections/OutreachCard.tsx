import { MessageSquare, Phone, Mail, Clock } from "lucide-react"
import type { PatientProfileData } from "../../types"
import { FormCard } from "../../../../components/onboarding/FormCard"

interface OutreachCardProps {
  patient: PatientProfileData
}

export function OutreachCard({ patient }: OutreachCardProps) {
  const modeIcon = {
    text: MessageSquare,
    phone: Phone,
    email: Mail,
  }[patient.communicationMode] || MessageSquare

  const modeLabel = {
    text: 'Text Message',
    phone: 'Phone Call',
    email: 'Email',
  }[patient.communicationMode] || 'Text Message'

  const ModeIcon = modeIcon

  return (
    <FormCard className="gap-6">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <MessageSquare className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-800">Outreach Strategy</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Preferred Communication
          </span>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <ModeIcon size={14} className="text-slate-400" />
            {modeLabel}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Preferred Timing Slots
          </span>
          <div className="flex flex-col gap-3">
            {patient.timingSlots.map((slot, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Clock size={14} className="text-slate-400" />
                {slot}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormCard>
  )
}
