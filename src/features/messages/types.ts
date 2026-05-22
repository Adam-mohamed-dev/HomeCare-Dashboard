export interface Message {
  id: string
  text: string
  senderId: string
  timestamp: string
  isMe: boolean
}

export interface Chat {
  id: string
  name: string
  image?: string
  initials?: string
  lastMessage: string
  time: string
  unreadCount: number
  type: "PT" | "Patient"
  status: "online" | "offline"
}
