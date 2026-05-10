export type CaseStatus =
  | "new"
  | "classifying"
  | "assigned"
  | "in_progress"
  | "field_visit"
  | "intervention"
  | "resolved"
  | "closed"
  | "escalated";

export type Priority = "critical" | "high" | "medium" | "low";

export type SLAStatus = "on_track" | "at_risk" | "breached";

export type CaseType = "service" | "legal" | "political" | "suggestion";

export type TimelineEventType =
  | "submitted"
  | "classified"
  | "assigned"
  | "contacted"
  | "scheduled"
  | "field_visit"
  | "note_added"
  | "status_changed"
  | "escalated"
  | "merged"
  | "intervention"
  | "resolved"
  | "closed";

export type UserRole =
  | "admin"
  | "supervisor"
  | "coordinator"
  | "committee_member"
  | "viewer";

export interface Citizen {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  isAnonymous: boolean;
  governorate: string;
  district?: string;
}

export interface Branch {
  id: string;
  name: string;
  governorate: string;
  address: string;
  phone: string;
  casesCount: number;
  closedCount: number;
  performance: number;
  coordinatorIds: string[];
  manager: string;
}

export interface Coordinator {
  id: string;
  name: string;
  branchId: string;
  phone: string;
  email: string;
  role: string;
  activeCases: number;
  completedCases: number;
  rating: number;
  joinedAt: string;
  initials: string;
}

export interface Committee {
  id: string;
  name: string;
  description: string;
  casesAssigned: number;
  casesResolved: number;
  members: string[];
  chair: string;
}

export interface AIClassification {
  suggestedType: CaseType;
  suggestedBranchId: string;
  suggestedPriority: Priority;
  confidence: number;
  duplicateRisk: number;
  potentialDuplicates: string[];
  keywords: string[];
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  actor: string;
  actorRole: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: "image" | "pdf" | "video" | "audio";
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Case {
  id: string;
  ref: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: Priority;
  type: CaseType;
  branchId: string;
  coordinatorId?: string;
  committeeId?: string;
  citizenId: string;
  createdAt: string;
  updatedAt: string;
  dueAt: string;
  slaStatus: SLAStatus;
  aiClassification: AIClassification;
  timeline: TimelineEvent[];
  attachments: Attachment[];
  isDuplicate: boolean;
  duplicateOfRef?: string;
  location: {
    governorate: string;
    district: string;
    landmark?: string;
  };
  tags: string[];
}

export interface ReportMetric {
  label: string;
  value: number;
  unit?: string;
  change: number;
  trend: "up" | "down" | "stable";
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  totalCases: number;
  closedCases: number;
  avgResolutionDays: number;
  slaCompliance: number;
}

export interface CoordinatorPerformance {
  coordinatorId: string;
  coordinatorName: string;
  branchName: string;
  activeCases: number;
  closedThisMonth: number;
  avgRating: number;
  fieldVisits: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

export interface Permission {
  resource: string;
  read: boolean;
  write: boolean;
  delete: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount: number;
}

export interface FieldVisit {
  id: string;
  caseId: string;
  caseRef: string;
  caseTitle: string;
  scheduledAt: string;
  coordinatorId: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  location: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  caseRef: string;
  type: "call" | "visit" | "review" | "followup" | "report";
  priority: Priority;
  dueAt: string;
  completed: boolean;
}
