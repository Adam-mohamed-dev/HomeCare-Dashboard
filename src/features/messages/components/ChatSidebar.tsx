import { useTranslation } from "react-i18next"
import { Search as SearchIcon } from "lucide-react"
import { cn } from "../../../lib/utils"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { Input } from "../../../components/ui/input"
import type { Chat } from "../types"

interface ChatSidebarProps {
  activeTab: "PT" | "Patient"
  onTabChange: (tab: "PT" | "Patient") => void
  chats: Chat[]
  selectedChatId: string | null
  onChatSelect: (id: string) => void
}

export function ChatSidebar({ 
  activeTab, 
  onTabChange, 
  chats, 
  selectedChatId, 
  onChatSelect 
}: ChatSidebarProps) {
  const { t } = useTranslation()

  return (
    <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/30">
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-slate-900">{t("nav.messages")}</h1>
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => onTabChange("PT")}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-xl transition-all",
              activeTab === "PT" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t("chat.tabs.therapists")}
          </button>
          <button
            onClick={() => onTabChange("Patient")}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-xl transition-all",
              activeTab === "Patient" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t("chat.tabs.patients")}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input 
            placeholder={t("chat.search_placeholder")}
            className="pl-10 rounded-xl border-slate-100 bg-white"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={cn(
              "w-full p-4 flex items-center gap-4 transition-all hover:bg-slate-50 border-l-4",
              selectedChatId === chat.id ? "bg-primary/5 border-primary" : "border-transparent"
            )}
          >
            <div className="relative shrink-0">
              <UserAvatar name={chat.name} image={chat.image} initials={chat.initials} className="h-12 w-12" />
              <div className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                chat.status === "online" ? "bg-emerald-500" : "bg-slate-300"
              )} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900 truncate">{chat.name}</span>
                <span className="text-[10px] text-slate-400 font-medium shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-xs text-slate-500 truncate leading-tight">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
