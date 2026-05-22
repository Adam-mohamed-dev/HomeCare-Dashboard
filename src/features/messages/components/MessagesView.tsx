import { useState, useMemo } from "react"
import { mockChats } from "../data/mockChats"
import { ChatSidebar } from "./ChatSidebar"
import { ChatWindow } from "./ChatWindow"
import { PageContainer } from "../../../components/layout/PageContainer"

export function MessagesView() {
  const [activeTab, setActiveTab] = useState<"PT" | "Patient">("PT")
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const filteredChats = useMemo(() => {
    return mockChats.filter(chat => chat.type === activeTab)
  }, [activeTab])

  const selectedChat = useMemo(() => {
    return mockChats.find(chat => chat.id === selectedChatId) || null
  }, [selectedChatId])

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessage("")
  }

  return (
    <PageContainer size="full" className="py-8">
      <div className="flex h-[calc(100vh-140px)] bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
        <ChatSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          chats={filteredChats}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
        />

        <ChatWindow 
          chat={selectedChat}
          message={message}
          onMessageChange={setMessage}
          onSend={handleSendMessage}
        />
      </div>
    </PageContainer>
  )
}
