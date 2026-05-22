import type { Case } from "../types"

export const mockCases: Case[] = [
  {
    id: "#SC-98552",
    patientName: "Marcus Brooks",
    patientInitials: "MB",
    referredDays: 1,
    locationZip: "94105",
    requiredDiscipline: "PT Assistant (PTA)",
    insurance: "Medicare Part B",
    preferredGender: "male",
    preferredAvailability: ["monday", "wednesday", "friday"],
    matchCount: 2,
    matchAvatars: [
      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      "https://i.pravatar.cc/150?u=a042581f4e29026704e"
    ]
  },
  {
    id: "#SC-99021",
    patientName: "Elena Langford",
    patientInitials: "EL",
    referredDays: 1,
    locationZip: "90210",
    requiredDiscipline: "Physical Therapist (PT)",
    insurance: "Blue Shield PPO",
    preferredGender: "no_preference",
    preferredAvailability: ["tuesday", "thursday"],
    matchCount: 2,
    matchAvatars: [
      "https://i.pravatar.cc/150?u=a042581f4e29026704f",
      "https://i.pravatar.cc/150?u=a042581f4e29026704g"
    ]
  },
  {
    id: "#SC-98001",
    patientName: "Sarah Jenkins",
    patientInitials: "SJ",
    referredDays: 1,
    locationZip: "94105",
    serviceAreaLabel: "SERVICE AREA",
    requiredDiscipline: "Occupational Therapist (OT)",
    insurance: "Aetna",
    preferredGender: "female",
    preferredAvailability: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    matchCount: 2,
    matchAvatars: [
      "https://i.pravatar.cc/150?u=a042581f4e29026704h",
      "https://i.pravatar.cc/150?u=a042581f4e29026704i"
    ]
  }
]
