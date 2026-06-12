import { MessageSquare, Phone, Mail } from "lucide-react"
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

      <div className="flex flex-col gap-4 pt-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Preferred Communication
        </span>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <ModeIcon size={14} className="text-slate-400" />
          {modeLabel}
        </div>
      </div>
    </FormCard>
  )
}
