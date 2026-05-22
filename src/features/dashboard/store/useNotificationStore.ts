import { create } from 'zustand'
import type { LiveVisit } from '../data.ts'
import { mockLiveVisits } from '../data'

interface NotificationStore {
  notifications: LiveVisit[]
  addNotification: (notification: LiveVisit) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  // Initialize with urgent visits from mock data
  notifications: mockLiveVisits.filter(visit => visit.statusType === 'urgent'),
  
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearAll: () => set({ notifications: [] }),
}))
