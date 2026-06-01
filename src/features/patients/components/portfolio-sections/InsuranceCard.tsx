import { Shield } from "lucide-react"
import type { PatientProfileData } from "../../types"
import { FormCard } from "../../../../components/onboarding/FormCard"

interface InsuranceCardProps {
  patient: PatientProfileData
}

export function InsuranceCard({ patient }: InsuranceCardProps) {
  return (
    <FormCard className="gap-6">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <Shield className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-800">Insurance</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provider</span>
          <span className="text-sm font-bold text-slate-700">{patient.insurance.provider}</span>
        </div>
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member ID</span>
          <span className="text-sm font-bold text-slate-700">{patient.insurance.memberId}</span>
        </div>
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Group Number</span>
          <span className="text-sm font-bold text-slate-700">{patient.insurance.groupNumber}</span>
        </div>
      </div>
    </FormCard>
  )
}
