export interface Case {
  id: string
  patientName: string
  patientInitials: string
  referredDays: number
  locationZip: string
  requiredDiscipline: string
  serviceAreaLabel?: string
  insurance: string
  preferredGender?: "male" | "female" | "no_preference"
  preferredAvailability?: string[]
  matchCount: number
  matchAvatars: string[]
  description?: string
}

export interface MatchProvider {
  id: string
  name: string
  credentials: string
  distance: string
  location: string
  zip: string
  disciplines: string[]
  utilization: number
  payRate: number
  image: string
  insurance: string[]
  availability: string[]
  matchIndicators: {
    zip: boolean
    insurance: boolean
    availability: boolean
    gender: boolean
  }
}

export interface Bid {
  id: string
  name: string
  image: string
  rate: number
  responseTime: string
  rating: number
  providerId: string
}
