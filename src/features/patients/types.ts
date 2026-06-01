export interface Patient {
  id: string
  name: string
  initials: string
  mrn: string
  dov: string
  status: string
  statusVariant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"
  assignedPt: string
  assignedPtImg: string | null
}

export interface PatientProfileData {
  id: string
  fullName: string
  mrn: string
  gender: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  communicationMode: string
  timingSlots: string[]
  status: string
  photoUrl: string
  primaryDiagnosis: string
  secondaryDiagnoses: string[]
  assignedPt: string
  assignedPtImg: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  insurance: {
    provider: string
    memberId: string
    groupNumber: string
  }
  visits: {
    scheduled: number
    completed: number
    missed: number
  }
  notes: {
    date: string
    author: string
    content: string
  }
}
