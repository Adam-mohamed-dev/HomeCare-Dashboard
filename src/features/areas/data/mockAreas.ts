import type { Area } from "../types"

export const MOCK_AREAS: Area[] = [
  { id: 'north', name: 'North Region', zips: ['90210', '90211', '90212', '90213', '90214'], providersCount: 12, patientsCount: 45 },
  { id: 'downtown', name: 'Downtown', zips: ['90012', '90013', '90014', '90015'], providersCount: 8, patientsCount: 30 },
  { id: 'west', name: 'Westside', zips: ['90024', '90025', '90401', '90402'], providersCount: 0, patientsCount: 0 },
  { id: 'south', name: 'South District', zips: ['90001', '90002', '90003'], providersCount: 5, patientsCount: 18 },
]
