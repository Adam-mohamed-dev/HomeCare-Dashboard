import type { Chat } from "../types"

export const mockChats: Chat[] = [
  { 
    id: "1", 
    name: "Dr. Marcus Chen", 
    image: "https://i.pravatar.cc/150?u=marcus", 
    lastMessage: "The patient is showing progress.", 
    time: "10:30 AM", 
    unreadCount: 2, 
    type: "PT", 
    status: "online" 
  },
  { 
    id: "2", 
    name: "Sarah Thorne", 
    image: "https://i.pravatar.cc/150?u=sarah", 
    lastMessage: "When is the next session?", 
    time: "09:15 AM", 
    unreadCount: 0, 
    type: "PT", 
    status: "offline" 
  },
  { 
    id: "3", 
    name: "Elena Langford", 
    initials: "EL", 
    lastMessage: "I need to reschedule for Tuesday.", 
    time: "Yesterday", 
    unreadCount: 1, 
    type: "Patient", 
    status: "online" 
  },
  { 
    id: "4", 
    name: "Marcus Brooks", 
    initials: "MB", 
    lastMessage: "Thank you for the update.", 
    time: "Yesterday", 
    unreadCount: 0, 
    type: "Patient", 
    status: "offline" 
  },
]
