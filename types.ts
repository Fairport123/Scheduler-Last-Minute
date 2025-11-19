export enum Role {
  SP = 'Service Provider',
  SR = 'Service Receiver',
  SF = 'Service Facilitator'
}

export enum Period {
  MORNING = '09:00 - 14:00',
  AFTERNOON = '14:00 - 19:00'
}

export interface TimeSlot {
  id: string;
  date: string; // ISO Date string
  displayDate: string;
  period: Period;
  
  // Schedule 1 & 2
  srAvailable: boolean;
  
  // Schedule 3
  sfAvailable: boolean;
  
  // Schedule 4 & 5 (Selection)
  isSelectedForOpportunity: boolean;
  
  // Schedule 5 (Confirmation)
  srConfirmed: boolean | null; // null = pending, true = yes, false = no
  sfConfirmed: boolean | null;
  
  // Schedule 6 (Timestamps)
  srResponseTime?: string;
  sfResponseTime?: string;
}

export interface AppState {
  currentView: string;
  currentUserRole: Role;
  slots: TimeSlot[];
  jobNo: string;
}

export const VIEW_HOME = 'home';
export const VIEW_SCHED_1 = 'schedule-1';
export const VIEW_SCHED_2 = 'schedule-2';
export const VIEW_SCHED_3 = 'schedule-3';
export const VIEW_SCHED_4 = 'schedule-4';
export const VIEW_SCHED_5 = 'schedule-5';
export const VIEW_SCHED_6 = 'schedule-6';
