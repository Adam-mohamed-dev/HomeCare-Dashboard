import { Mail, Phone, MoreHorizontal, User } from "lucide-react"
import type { PatientProfileData } from "../../types"
import { cn } from "../../../../lib/utils"

interface PortfolioHeaderProps {
  patient: PatientProfileData
}

export function PortfolioHeader({ patient }: PortfolioHeaderProps) {
  return (
    <div className="bg-slate-50/50 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 w-full">
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[20px] sm:rounded-[24px] bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-sm">
            <User size={48} />
          </div>
          <div className={cn(
            "absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-wider border-2 border-white whitespace-nowrap shadow-sm",
            "bg-status-active text-status-active-text"
          )}>
            {patient.status.toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {patient.fullName}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 font-medium text-sm sm:text-base">
              <User size={16} className="text-slate-400" />
              <span>{patient.gender === 'male' ? 'Male' : 'Female'} &middot; MRN: {patient.mrn}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-12 w-full pt-2">
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</span>
              <span className="text-sm font-semibold text-slate-700 tabular-nums">{patient.phone}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</span>
              <span className="text-sm font-semibold text-slate-700 break-all">{patient.email}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">City</span>
              <span className="text-sm font-semibold text-slate-700">{patient.city}, {patient.state}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zip Code</span>
              <span className="text-sm font-semibold text-slate-700">{patient.zipCode}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all">
          <Mail size={18} />
        </button>
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all">
          <Phone size={18} />
        </button>
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  )
}
