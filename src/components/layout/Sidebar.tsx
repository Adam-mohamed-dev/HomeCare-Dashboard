import {
  LayoutGrid,
  Users,
  BriefcaseMedical,
  ClipboardList,
  Gauge,
  X,
  MessageSquare,
  Calendar,
  MapPinned
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "../../lib/utils"
import { UserBadge } from "./UserBadge"
import { Link } from "@tanstack/react-router"

const navItems = [
  { icon: LayoutGrid, labelKey: "nav.dashboard", to: "/" },
  { icon: Users, labelKey: "nav.patients", to: "/patients" },
  { icon: BriefcaseMedical, labelKey: "nav.providers", to: "/providers" },
  { icon: ClipboardList, labelKey: "nav.cases", to: "/cases" },
  { icon: MessageSquare, labelKey: "nav.messages", to: "/messages" },
  { icon: Calendar, labelKey: "nav.appointments", to: "/appointments" },
  { icon: MapPinned, labelKey: "nav.areas", to: "/areas" },
  { icon: Gauge, labelKey: "nav.workload", to: "/workload" },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t, i18n } = useTranslation('translation')
  const isRtl = i18n.dir() === "rtl"

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 h-full w-64 bg-header border-sidebar-border flex flex-col pb-6 z-40 transition-transform duration-300 ease-in-out",
        "lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-64px)]",
        isRtl
          ? "right-0 border-l translate-x-full"
          : "left-0 border-r -translate-x-full",
        isOpen && "translate-x-0",
        isRtl && isOpen && "translate-x-0"
      )}>
        {/* Mobile Header in Sidebar */}
        <div className="flex items-center justify-between px-8 pt-6 lg:hidden">
          <span className="font-bold text-primary">Menu</span>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-md">
            <X size={20} className="text-brand-dark" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-8 py-8 flex items-center gap-4">
          <UserBadge />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[14px] leading-5 text-brand-dark truncate">
              {t("common.referral_desk")}
            </span>
            <span className="font-normal text-[12px] leading-4 text-text-muted truncate">
              {t("common.home_care_pt_unit")}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-1 pr-4 rtl:pr-0 rtl:pl-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-8 py-3 cursor-pointer transition-all duration-200 group",
                "rounded-r-full rtl:rounded-l-full rtl:rounded-r-none"
              )}
              activeProps={{
                className: "bg-nav-active text-nav-active-text shadow-sm"
              }}
              inactiveProps={{
                className: "text-nav-inactive-text hover:bg-nav-active/40 hover:text-nav-active-text"
              }}
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    "shrink-0 transition-colors",
                    isActive ? "text-nav-active-text" : "text-nav-inactive-text group-hover:text-nav-active-text"
                  )}>
                    <item.icon size={18} />
                  </div>
                  <span className={cn(
                    "text-[14px] leading-5 transition-colors",
                    isActive ? "font-bold" : "font-normal group-hover:font-medium"
                  )}>
                    {t(item.labelKey as any)}
                  </span>
                </>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
