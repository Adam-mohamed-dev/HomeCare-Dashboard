export type DashboardStatus = 'primary' | 'success' | 'urgent' | 'slate' | 'emerald';

export interface Participant {
  id: string;
  name: string;
  phone: string;
  image?: string;
}

export interface LiveVisit {
  id: string;
  patient: Omit<Participant, 'id'> & { id?: string };
  provider: Participant & { image: string };
  time: string;
  statusKey: string;
  statusType: 'primary' | 'success' | 'urgent';
  progress: number;
}

export interface DashboardActivityEvent {
  id: string;
  type: string;
  titleKey: string;
  titleParams?: any;
  subtitleKey: string;
  subtitleParams?: any;
}

export const mockLiveVisits: LiveVisit[] = [
  {
    id: "1",
    patient: { name: "Anita Lopez", phone: "(555) 012-3456", id: "anita-lopez" },
    provider: { name: "Dr. James Wilson", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200", phone: "(555) 987-6543", id: "dr-james-wilson" },
    statusKey: "common.en_route",
    time: "12:15 PM",
    progress: 45,
    statusType: "primary"
  },
  {
    id: "2",
    patient: { name: "Robert Jenkins", phone: "(555) 234-5678", id: "robert-jenkins" },
    provider: { name: "Martha Graham", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200", phone: "(555) 876-5432", id: "martha-graham" },
    statusKey: "common.en_route",
    time: "1:30 PM",
    progress: 88,
    statusType: "urgent"
  },
  {
    id: "3",
    patient: { name: "Sarah Connor", phone: "(555) 345-6789", id: "sarah-connor" },
    provider: { name: "John Smith", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200", phone: "(555) 765-4321", id: "john-smith" },
    statusKey: "common.active",
    time: "11:00 AM",
    progress: 100,
    statusType: "success"
  }
]

export const mockActivities: DashboardActivityEvent[] = [
  {
    id: "1",
    type: "lead",
    titleKey: "notifications.activity_lead_title",
    subtitleKey: "notifications.activity_lead_sub",
    subtitleParams: { name: "James Miller", time: "12 mins" }
  },
  {
    id: "2",
    type: "decline",
    titleKey: "notifications.activity_decline_title",
    titleParams: { id: "1023" },
    subtitleKey: "notifications.activity_decline_sub",
    subtitleParams: { name: "Dr. Chen", time: "1 hr" }
  },
  {
    id: "3",
    type: "assignment",
    titleKey: "notifications.activity_assign_title",
    subtitleKey: "notifications.activity_assign_sub",
    subtitleParams: { name: "PT Martha G.", id: "1045", time: "3 hrs" }
  },
  {
    id: "4",
    type: "upload",
    titleKey: "notifications.activity_upload_title",
    subtitleKey: "notifications.activity_upload_sub",
    subtitleParams: { id: "992", time: "5 hrs" }
  }
]
