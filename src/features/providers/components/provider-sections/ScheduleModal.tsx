import { X, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog"
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  provider: {
    name: string
    discipline: string
    image: string
  } | null
  events: any[]
}

export function ScheduleModal({ isOpen, onClose, provider, events }: ScheduleModalProps) {
  const { i18n } = useTranslation()
  if (!provider) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden border-none rounded-[32px] bg-white flex flex-col">
        <DialogHeader className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-4 ring-white shadow-sm">
                <AvatarImage src={provider.image} />
                <AvatarFallback>{provider.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{provider.name}</DialogTitle>
                <span className="text-xs sm:text-sm font-medium text-primary">{provider.discipline}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full hover:bg-white hover:shadow-sm"
            >
              <X size={20} className="text-slate-400" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-4 sm:p-8 calendar-container overflow-y-auto flex-1 custom-scrollbar">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            initialDate="2026-05-12"
            locale={i18n.language}
            headerToolbar={{
              left: 'prev,next today',
              center: '',
              right: 'title'
            }}
            events={events}
            slotMinTime="07:00:00"
            slotMaxTime="19:00:00"
            allDaySlot={false}
            height="auto"
            slotEventOverlap={false}
            eventClassNames="rounded-lg border-none px-2 py-1 text-xs font-bold"
            dayHeaderClassNames="bg-slate-50 border-none py-4 text-slate-500 font-bold uppercase tracking-wider text-[11px]"
            slotLabelClassNames="text-slate-400 font-medium text-[11px]"
          />
        </div>

        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <MapPin size={16} />
            <span className="hidden sm:inline">Asheville Regional Center</span>
            <span className="sm:hidden">Asheville</span>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
