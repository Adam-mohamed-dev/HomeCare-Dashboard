import { z } from "zod"

export const providerSchema = z.object({
  // Professional Identity
  fullName: z.string().min(3, "Full legal name is required"),
  npiNumber: z.string().regex(/^\d{10}$/, "NPI must be exactly 10 digits"),
  primaryDiscipline: z.string().min(1, "Primary discipline is required"),
  specializedServices: z.string().optional(),

  // Coverage & Logistics
  zipCodes: z.array(z.string()).min(1, "Select at least one ZIP code"),
  insuranceNetworks: z.array(z.string()).min(1, "Select at least one insurance network"),
  languagesSpoken: z.string().min(2, "Languages spoken are required"),

  // Capacity & Financial
  weeklyCapacity: z.number().min(1, "Capacity must be at least 1").max(100, "Maximum 100 sessions"),
  payRate: z.number().min(1, "Pay rate is required"),
  payType: z.string().min(1, "Pay type is required"),

  // Contact Information
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  isScheduleLocked: z.boolean().default(false),
  
  // Availability Schedule
  availability: z.array(z.object({
    day: z.string(),
    slots: z.array(z.object({
      startTime: z.string(),
      endTime: z.string(),
      zipCode: z.string()
    }))
  })).min(7, "Full week schedule required")
})

export type ProviderFormData = z.infer<typeof providerSchema>
