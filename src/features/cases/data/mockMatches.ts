import type { MatchProvider } from "../types"

export const mockMatches: MatchProvider[] = [
  {
    id: "dr-marcus-chen",
    name: "Dr. Marcus Chen",
    credentials: "DPT",
    distance: "1.2 miles away",
    location: "Beverly Hills",
    zip: "94105",
    disciplines: ["Geriatrics", "Post-Op Rehab", "Fluent in Mandarin"],
    utilization: 62,
    payRate: 145,
    image: "https://i.pravatar.cc/150?u=marcus",
    insurance: ["Medicare", "Blue Shield", "UnitedHealthcare"],
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    matchIndicators: {
      zip: true,
      insurance: true,
      availability: true,
      gender: true
    }
  },
  {
    id: "sarah-jenkins-match",
    name: "Sarah Jenkins",
    credentials: "PT",
    distance: "2.8 miles away",
    location: "West Hollywood",
    zip: "90210",
    disciplines: ["Orthopedics", "In-Home Tech Expert"],
    utilization: 88,
    payRate: 138,
    image: "https://i.pravatar.cc/150?u=sarahj",
    insurance: ["Medicare", "Aetna"],
    availability: ["monday", "wednesday", "friday"],
    matchIndicators: {
      zip: true,
      insurance: true,
      availability: false,
      gender: true
    }
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    credentials: "PT, MSPT",
    distance: "4.1 miles away",
    location: "Santa Monica",
    zip: "94110",
    disciplines: ["Wound Care PT", "Weekend Availability"],
    utilization: 45,
    payRate: 152,
    image: "https://i.pravatar.cc/150?u=james",
    insurance: ["Blue Shield", "Kaiser"],
    availability: ["saturday", "sunday", "tuesday", "thursday"],
    matchIndicators: {
      zip: false,
      insurance: true,
      availability: true,
      gender: false
    }
  }
]
