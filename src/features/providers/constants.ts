export const DAYS_OF_WEEK = [
  { id: "mon", labelKey: "mon" },
  { id: "tue", labelKey: "tue" },
  { id: "wed", labelKey: "wed" },
  { id: "thu", labelKey: "thu" },
  { id: "fri", labelKey: "fri" },
  { id: "sat", labelKey: "sat" },
  { id: "sun", labelKey: "sun" }
] as const

export type DayId = typeof DAYS_OF_WEEK[number]["id"]

export const getEmptyWeeklyAvailability = () => 
  DAYS_OF_WEEK.map(day => ({
    day: day.id,
    slots: []
  }))

export const MOCK_REGIONS = [
  { id: 'north', name: 'North Region', zips: ['90210', '90211', '90212', '90213', '90214'] },
  { id: 'downtown', name: 'Downtown', zips: ['90012', '90013', '90014', '90015'] },
  { id: 'west', name: 'Westside', zips: ['90024', '90025', '90401', '90402'] }
] as const
