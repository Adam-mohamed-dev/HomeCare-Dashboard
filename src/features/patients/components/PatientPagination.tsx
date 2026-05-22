import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/ui/button"

interface PatientPaginationProps {
  currentCount: number
  totalCount: number
}

export function PatientPagination({ currentCount, totalCount }: PatientPaginationProps) {
  const { t } = useTranslation('translation')

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 mb-10">
      <span className="text-sm text-muted-foreground font-medium">
        {t("common.showing_count", { count: currentCount, total: totalCount })}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-slate-100/50 hover:bg-slate-100">
          <ChevronLeft size={18} />
        </Button>
        <div className="flex items-center gap-1">
          <Button size="icon" className="rounded-full h-10 w-10 bg-primary text-white font-bold">1</Button>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-slate-600 font-medium">2</Button>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-slate-600 font-medium">3</Button>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-slate-100/50 hover:bg-slate-100">
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}
