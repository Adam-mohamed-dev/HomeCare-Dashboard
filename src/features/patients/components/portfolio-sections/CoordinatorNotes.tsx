import { NotebookPen, Plus } from "lucide-react"
import type { PatientProfileData } from "../../types"

interface CoordinatorNotesProps {
  patient: PatientProfileData
}

export function CoordinatorNotes({ patient }: CoordinatorNotesProps) {
  return (
    <div className="bg-slate-50/80 rounded-[32px] p-8 flex flex-col gap-6 border border-slate-100">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <NotebookPen className="text-primary" size={20} />
          <h2 className="text-lg font-bold text-slate-800">Coordinator Notes</h2>
        </div>
        <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 hover:text-primary/80 transition-colors">
          <Plus size={14} />
          Add Note
        </button>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {patient.notes.date}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            BY {patient.notes.author}
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {patient.notes.content}
        </p>
      </div>
    </div>
  )
}
