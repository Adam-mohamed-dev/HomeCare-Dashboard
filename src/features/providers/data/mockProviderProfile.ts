import type { ProviderProfileData } from "../types"

export const mockProviderProfile: ProviderProfileData = {
  id: "dr-marcus-chen",
  fullName: "Dr. Marcus Chen",
  credentials: "DPT",
  title: "Physical Therapist & Geriatric Specialist",
  npiNumber: "1892837456",
  taxonomy: "1041C0700X",
  directPhone: "(555) 234-8901",
  email: "m.chen@homecare.com",
  status: "ACTIVE",
  photoUrl: "https://i.pravatar.cc/150?u=marcus",
  gender: "male",
  disciplines: [
    "Geriatric Physical Therapy",
    "Post-Op Rehabilitation",
    "Fall Prevention",
    "Manual Therapy",
    "Home Safety Assessments"
  ],
  patientFocus: [
    "Seniors (65+)",
    "Adult Rehabilitation",
    "Chronic Pain Management"
  ],
  serviceFormats: [
    "In-Home Visits",
    "Telehealth (Available)"
  ],
  metrics: {
    utilization: 62,
    utilizationText: "Stable - 6 spots remaining",
    caseloadCurrent: 25,
    caseloadMax: 40,
    payRate: 145,
    avgResponseTime: 1.2
  },
  coverage: {
    zipCodes: ["94105", "94107", "94110", "94114", "94117"],
    additionalCount: 8
  },
  insurance: [
    "Medicare Part B",
    "Blue Shield PPO",
    "UnitedHealthcare",
    "Cigna Global",
    "Kaiser Permanente"
  ],
  availability: {
    monday: "08:00 AM - 04:00 PM",
    tuesday: "08:00 AM - 04:00 PM",
    wednesday: "08:00 AM - 12:00 PM",
    thursday: "08:00 AM - 04:00 PM",
    friday: "08:00 AM - 04:00 PM",
    updatedAt: "UPDATED 1H AGO"
  },
  notes: {
    date: "OCT 24, 2023",
    author: "COORDINATOR",
    content: "Dr. Chen is highly rated for his patience with geriatric patients. He is fluent in Mandarin and Cantonese, which makes him a perfect match for families in the Sunset and Richmond districts."
  }
}

export const mockEvents = [
  { title: "Eleanor Vance", start: "2026-05-12T08:00:00", end: "2026-05-12T09:00:00", backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" },
  { title: "Julian Thorne", start: "2026-05-12T09:00:00", end: "2026-05-12T10:00:00", backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" },
  { title: "Sarah Miller", start: "2026-05-12T13:00:00", end: "2026-05-12T14:00:00", backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" },
  { title: "Robert Blake", start: "2026-05-12T16:00:00", end: "2026-05-12T17:00:00", backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" },
  { title: "Lunch Break", start: "2026-05-12T12:00:00", end: "2026-05-12T13:00:00", backgroundColor: "#fef2f2", borderColor: "#fee2e2", textColor: "#ef4444", classNames: ["lunch-break-event"] },
]
