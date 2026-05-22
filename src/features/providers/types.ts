export interface ProviderProfileData {
  id: string
  fullName: string
  credentials: string
  title: string
  npiNumber: string
  taxonomy: string
  directPhone: string
  email: string
  status: "ACTIVE" | "INACTIVE"
  photoUrl: string
  gender: "male" | "female" | "other"
  disciplines: string[]
  patientFocus: string[]
  serviceFormats: string[]
  metrics: {
    utilization: number
    utilizationText: string
    caseloadCurrent: number
    caseloadMax: number
    payRate: number
    avgResponseTime: number
  }
  coverage: {
    zipCodes: string[]
    additionalCount: number
  }
  insurance: string[]
  availability: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    updatedAt: string
  }
  notes: {
    date: string
    author: string
    content: string
  }
}

export interface ProviderSummary {
  id: string
  name: string
  discipline: string
  location: string
  rating: number
  reviews: number
  availability: string
  image: string
  status: string
  utilization: number
}
