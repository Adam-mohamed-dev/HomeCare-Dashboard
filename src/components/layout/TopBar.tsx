import { Menu, LogOut } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"
import { UserBadge } from "./UserBadge"
import { UrgentNotifications } from "../../features/dashboard/components/UrgentNotifications"

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          <img
            src="/logos/Logo.png"
            alt="HomeCare"
            className="h-8 w-auto shrink-0"
          />
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

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 focus:outline-none hover:opacity-80 cursor-pointer transition-opacity"
          >
            <span className="hidden sm:inline font-medium text-[14px] leading-5 text-text-secondary whitespace-nowrap">
              {t("common.coordinator_profile")}
            </span>
            <UserBadge className="w-8 h-8 sm:w-10 sm:h-10" size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  navigate({ to: '/login' })
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                {t("common.logout", "Logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
