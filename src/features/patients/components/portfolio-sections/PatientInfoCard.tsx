import { MapPin, Home, Phone, Mail } from "lucide-react"
import type { PatientProfileData } from "../../types"
import { FormCard } from "../../../../components/onboarding/FormCard"

interface PatientInfoCardProps {
  patient: PatientProfileData
}

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <FormCard className="gap-6">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <Home className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Residence</span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <MapPin size={14} className="text-slate-400" />
              {patient.address}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <MapPin size={14} className="text-slate-400" />
              {patient.city}, {patient.state} {patient.zipCode}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Phone size={14} className="text-slate-400" />
              {patient.phone}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Mail size={14} className="text-slate-400" />
              {patient.email}
            </div>
          </div>
        </div>
      </div>
    </FormCard>
  )
}
