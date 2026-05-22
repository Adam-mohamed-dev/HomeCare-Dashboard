import { useTranslation } from "react-i18next"
import { Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { Button } from "../../../components/ui/button"
import { MessageBubble } from "./MessageBubble"
import type { Chat } from "../types"

interface ChatWindowProps {
  chat: Chat | null
  message: string
  onMessageChange: (val: string) => void
  onSend: () => void
}

export function ChatWindow({ chat, message, onMessageChange, onSend }: ChatWindowProps) {
  const { t } = useTranslation()

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-6 bg-slate-50/10">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
          <Send size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-slate-900">{t("nav.messages")}</h3>
          <p className="text-slate-500 max-w-[280px]">{t("chat.no_chat_selected")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <UserAvatar name={chat.name} image={chat.image} initials={chat.initials} className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm">{chat.name}</span>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
              {chat.status === "online" ? t("chat.status_online") : t("chat.status_offline")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary rounded-full">
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary rounded-full">
            <Video size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary rounded-full">
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar bg-slate-50/20">
        <MessageBubble 
          text={chat.lastMessage}
          time="10:30 AM"
          isMe={false}
        />

        <MessageBubble 
          text={`Hi ${chat.name}, I'm checking in on the case status.`}
          time="10:32 AM"
          isMe={true}
        />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-4 p-2 pl-4 rounded-2xl bg-slate-50 border border-slate-100">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary rounded-xl shrink-0">
            <Paperclip size={20} />
          </Button>
          <input 
            type="text"
            placeholder={t("chat.type_placeholder")}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-700"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
          />
          <Button 
            onClick={onSend}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl h-10 w-10 p-0 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}
