export type Stage = "Pre qualified" | "Application" | "Documents" | "Underwriting" | "Offer sent" | "Funding" | "Funded" | "Declined";
export type DocumentStatus = "Verified" | "Received" | "Requested" | "Expired";
export type TaskType = "SLA" | "Compliance" | "Follow up" | "Funding";
export type View = "dashboard" | "businesses" | "pipeline" | "work" | "documents" | "partners" | "reports";
export type BusinessTab = "Overview" | "Application" | "Underwriting" | "Offers" | "Documents" | "Activity and audit";

export type Task = { id: string; title: string; due: string; type: TaskType; done: boolean };
export type Document = { id: string; name: string; status: DocumentStatus; updated: string; owner: string };
export type Offer = { id: string; partner: string; product: string; amount: string; terms: string; payment: string; expiry: string; selected: boolean };
export type AuditEvent = { id: string; at: string; actor: string; action: string; context: string };
export type Owner = { name: string; share: string; role: string; initials: string };
export type Business = {
  id: string;
  initials: string;
  name: string;
  industry: string;
  location: string;
  owner: string;
  contact: string;
  phone: string;
  stage: Stage;
  requested: string;
  product: string;
  revenue: string;
  timeInBusiness: string;
  risk: "Low" | "Moderate" | "High";
  score: string;
  decisionDue: string;
  owners: Owner[];
  documents: Document[];
  offers: Offer[];
  tasks: Task[];
  audits: AuditEvent[];
  notes: string[];
};

export type OpenTask = Task & { business: string; businessId: string };
export type DocumentException = Document & { business: string; businessId: string };
