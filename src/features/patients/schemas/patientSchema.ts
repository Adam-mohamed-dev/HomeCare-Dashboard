import { z } from "zod"

export const patientSchema = z.object({
  // Personal Identity
  fullName: z.string().min(3, "Full legal name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  
  // Primary Residence
  address: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}$/, "Zip code must be 5 digits"),
  
  // Outreach Strategy
  communicationMode: z.enum(["text", "phone", "email"]),
  timingSlots: z.array(z.string()).min(1, "Select at least one timing slot"),
  
  // Intake Docs
  documentType: z.string().optional()
})

export type PatientFormData = z.infer<typeof patientSchema>
