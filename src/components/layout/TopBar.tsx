import { LayoutDashboard, Menu } from "lucide-react"
import { useTranslation } from "react-i18next"
import { UserBadge } from "./UserBadge"
import { UrgentNotifications } from "../../features/dashboard/components/UrgentNotifications"

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { t } = useTranslation()

  return (
    <header className="w-full h-16 bg-header flex items-center justify-between px-4 sm:px-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] z-50 sticky top-0 border-b border-border">
      {/* Container Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="p-2 lg:hidden text-brand-dark hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-5 h-5 flex items-center justify-center text-primary shrink-0">
            <LayoutDashboard size={20} strokeWidth={2.5} />
          </div>
          <h1 className="font-bold text-base sm:text-[20px] leading-7 tracking-[-0.5px] text-primary whitespace-nowrap">
            <span className="hidden xs:inline">HomeCare DashBoard</span>
            <span className="xs:hidden">HomeCare</span>
          </h1>
        </div>
      </div>

      {/* Container Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Urgent Alerts */}
        <UrgentNotifications />

        <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block" />

        {/* Profile Text - Hidden on small mobile */}
        <span className="hidden sm:inline font-medium text-[14px] leading-5 text-text-secondary whitespace-nowrap">
          {t("common.coordinator_profile")}
        </span>
        {/* Avatar */}
        <UserBadge className="w-8 h-8 sm:w-10 sm:h-10" size={16} />
      </div>
    </header>
  )
}
