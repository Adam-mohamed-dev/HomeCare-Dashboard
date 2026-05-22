import { cn } from "../../../lib/utils"

interface ActivityItemProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  subtitle: string
}

export function ActivityItem({ icon, iconBg, title, subtitle }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 group cursor-pointer">
      <div className={cn("w-11 h-11 rounded-xl shrink-0 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110", iconBg)}>
        {icon}
      </div>
      <div className="flex flex-col gap-1 pt-0.5">
        <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors duration-300">{title}</h4>
        <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
      </div>
    </div>
  )
}
