import { create } from 'zustand'
import { getEmptyWeeklyAvailability } from '../constants'
import type { ProviderFormData } from '../schemas/providerSchema'

export interface ProviderProfile extends ProviderFormData {
  id: string
}

interface ProviderStore {
  profiles: Record<string, ProviderProfile>
  addProvider: (data: ProviderFormData) => string
  updateProvider: (id: string, data: ProviderFormData) => void
  getProfile: (id: string) => ProviderProfile | undefined
}

function generateId(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const seedAvailability = getEmptyWeeklyAvailability()

const seedProfiles: Record<string, ProviderProfile> = {
  'sarah-thorne': {
    id: 'sarah-thorne',
    fullName: 'Sarah Thorne',
    npiNumber: '1234567890',
    primaryDiscipline: 'Physical Therapy',
    specializedServices: 'Sports Rehabilitation, Post-surgical Recovery',
    zipCodes: ['94102', '94107', '94110'],
    insuranceNetworks: ['Aetna', 'Blue Shield PPO', 'Cigna'],
    languagesSpoken: 'English, Spanish',
    weeklyCapacity: 25,
    payRate: 120,
    payType: 'per_session',
    email: 'sarah.thorne@example.com',
    phone: '(555) 123-4567',
    isScheduleLocked: false,
    availability: seedAvailability,
  }
}

export const useProviderStore = create<ProviderStore>((set, get) => ({
  profiles: seedProfiles,

  addProvider: (data) => {
    const id = generateId(data.fullName)
    set((state) => ({
      profiles: { ...state.profiles, [id]: { ...data, id } },
    }))
    return id
  },

  updateProvider: (id, data) => set((state) => ({
    profiles: { ...state.profiles, [id]: { ...data, id } },
  })),

  getProfile: (id) => get().profiles[id],
}))
