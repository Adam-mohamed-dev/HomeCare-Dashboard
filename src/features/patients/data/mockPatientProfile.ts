import type { PatientProfileData } from "../types"

export const mockPatientProfile: PatientProfileData = {
  id: "eleanor-miller",
  fullName: "Eleanor Miller",
  mrn: "882-192",
  gender: "female",
  phone: "(555) 123-4567",
  email: "eleanor.m@email.com",
  address: "742 Maple Street",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  communicationMode: "phone",
  timingSlots: ["8AM - 10AM", "10AM - 12PM"],
  status: "Lead",
  photoUrl: "",
  primaryDiagnosis: "Hip Replacement Recovery",
  secondaryDiagnoses: [
    "Osteoarthritis",
    "Hypertension",
    "Type 2 Diabetes"
  ],
  assignedPt: "Dr. Julian Vance",
  assignedPtImg: "https://i.pravatar.cc/150?u=julian",
  emergencyContact: {
    name: "Margaret Miller",
    relation: "Daughter",
    phone: "(555) 987-6543"
  },
  insurance: {
    provider: "Medicare Part B",
    memberId: "MED882192",
    groupNumber: "GRP-4471"
  },
  visits: {
    scheduled: 12,
    completed: 10,
    missed: 0
  },
  notes: {
    date: "OCT 24, 2023",
    author: "COORDINATOR",
    content: "Patient is recovering well from hip replacement. Requires assistance with mobility and daily activities. Prefers morning visits between 9 AM and 11 AM."
  }
}
