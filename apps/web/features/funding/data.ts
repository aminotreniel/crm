import type { AuditEvent, Business, Stage, View } from "./types";

export const workflowStages: Stage[] = ["Pre qualified", "Application", "Documents", "Underwriting", "Offer sent", "Funding", "Funded"];

export const navigationGroups: { label: string; items: { icon: string; label: string; view: View }[] }[] = [
  { label: "Relationship management", items: [{ icon: "⌂", label: "Dashboard", view: "dashboard" }, { icon: "◉", label: "Businesses", view: "businesses" }, { icon: "◇", label: "Applications", view: "pipeline" }] },
  { label: "Operations", items: [{ icon: "✓", label: "Work queue", view: "work" }, { icon: "▣", label: "Documents", view: "documents" }] },
  { label: "Network and insight", items: [{ icon: "◫", label: "Capital partners", view: "partners" }, { icon: "▥", label: "Reports", view: "reports" }] },
];

const audit = (id: string, at: string, actor: string, action: string, context: string): AuditEvent => ({ id, at, actor, action, context });

export const initialBusinesses: Business[] = [
  {
    id: "sf", initials: "SF", name: "Summit Fleet Services", industry: "Trucking and logistics", location: "Dallas, TX", owner: "Leah Morgan", contact: "Roberto Castillo", phone: "+1 214 555 0184", stage: "Underwriting", requested: "$500,000", product: "Working capital", revenue: "$182,400 per month", timeInBusiness: "8 years", risk: "Moderate", score: "78 of 100", decisionDue: "Today at 4:30 PM",
    owners: [{ name: "Roberto Castillo", share: "75%", role: "Managing member and guarantor", initials: "RC" }, { name: "Mia Castillo", share: "25%", role: "Member", initials: "MC" }],
    documents: [{ id: "bank", name: "Bank statements from May to August 2026", status: "Verified", updated: "Today at 10:02 AM", owner: "Underwriting" }, { id: "tax", name: "2025 business tax return", status: "Received", updated: "Today at 9:48 AM", owner: "Leah Morgan" }, { id: "articles", name: "Articles of organization", status: "Verified", updated: "22 Aug", owner: "Operations" }, { id: "ownerid", name: "Owner ID for Roberto Castillo", status: "Requested", updated: "Due today", owner: "Leah Morgan" }],
    offers: [{ id: "direct", partner: "Cortada Direct", product: "Working capital", amount: "$475,000", terms: "1.23 factor for 34 weeks", payment: "$17,191 weekly", expiry: "28 Aug 2026", selected: false }],
    tasks: [{ id: "decision", title: "Complete initial underwriting decision", due: "Today at 4:30 PM", type: "SLA", done: false }, { id: "identity", title: "Verify Roberto’s government issued ID", due: "Today", type: "Compliance", done: false }, { id: "call", title: "Call client about seasonal payment structure", due: "26 Aug", type: "Follow up", done: false }],
    audits: [audit("e1", "Today at 10:02 AM", "Avery Smith", "Bank statements marked verified", "Document review"), audit("e2", "Today at 9:48 AM", "Leah Morgan", "Tax return uploaded", "Document collection"), audit("e3", "22 Aug at 2:11 PM", "Leah Morgan", "Application moved to underwriting", "Application workflow")], notes: ["Client needs three vehicle leases completed before peak season.", "Requested a repayment structure aligned to seasonal fleet revenue."],
  },
  {
    id: "bm", initials: "BM", name: "Brightpath Medical Staffing", industry: "Healthcare", location: "Miami, FL", owner: "Leah Morgan", contact: "Jessica Williams", phone: "+1 305 555 0163", stage: "Offer sent", requested: "$275,000", product: "Term loan", revenue: "$244,000 per month", timeInBusiness: "6 years", risk: "Low", score: "86 of 100", decisionDue: "Offer expires 27 Aug",
    owners: [{ name: "Jessica Williams", share: "100%", role: "President and guarantor", initials: "JW" }],
    documents: [{ id: "bank2", name: "Bank statements from May to August 2026", status: "Verified", updated: "21 Aug", owner: "Underwriting" }, { id: "tax2", name: "2025 business tax return", status: "Verified", updated: "21 Aug", owner: "Underwriting" }, { id: "consent", name: "Signed credit authorization", status: "Verified", updated: "20 Aug", owner: "Compliance" }],
    offers: [{ id: "cortada", partner: "Cortada Direct", product: "Term loan", amount: "$275,000", terms: "14.49% fixed APR for 48 months", payment: "$7,644 monthly", expiry: "27 Aug 2026", selected: false }, { id: "atlas", partner: "Atlas Capital", product: "Term loan", amount: "$250,000", terms: "15.20% fixed APR for 48 months", payment: "$7,080 monthly", expiry: "27 Aug 2026", selected: false }],
    tasks: [{ id: "offercall", title: "Review offer and total cost with client", due: "Today", type: "Follow up", done: false }, { id: "offerexpiry", title: "Confirm acceptance or update proposal", due: "27 Aug", type: "SLA", done: false }], audits: [audit("e4", "22 Aug at 4:45 PM", "Leah Morgan", "Two offers sent to client", "Offer delivery"), audit("e5", "22 Aug at 4:11 PM", "Priya Shah", "Underwriting approved", "Decision record")], notes: ["Client is refinancing a high cost obligation before Q4."],
  },
  {
    id: "ai", initials: "AI", name: "Apex Industrial Fabrication", industry: "Manufacturing", location: "Tampa, FL", owner: "Noah Williams", contact: "Daniel Morgan", phone: "+1 813 555 0122", stage: "Documents", requested: "$1,200,000", product: "Term loan", revenue: "$391,000 per month", timeInBusiness: "18 years", risk: "Moderate", score: "Pending", decisionDue: "Documents due 26 Aug",
    owners: [{ name: "Daniel Morgan", share: "60%", role: "CEO and guarantor", initials: "DM" }, { name: "Ella Morgan", share: "40%", role: "CFO and guarantor", initials: "EM" }],
    documents: [{ id: "bank3", name: "Bank statements from May to August 2026", status: "Received", updated: "22 Aug", owner: "Noah Williams" }, { id: "tax3", name: "2025 business tax return", status: "Requested", updated: "Due 26 Aug", owner: "Noah Williams" }, { id: "debt", name: "Debt schedule", status: "Requested", updated: "Due 26 Aug", owner: "Noah Williams" }], offers: [], tasks: [{ id: "request", title: "Request debt schedule and 2025 tax return", due: "Today", type: "Follow up", done: false }, { id: "ubo", title: "Validate beneficial owner information", due: "26 Aug", type: "Compliance", done: false }], audits: [audit("e6", "22 Aug at 1:21 PM", "Noah Williams", "Document request sent", "Document collection")], notes: ["Expansion facility and equipment acquisition. Larger deal documents required."],
  },
  {
    id: "nl", initials: "NS", name: "Northline Studio", industry: "Professional services", location: "Oakland, CA", owner: "Noah Williams", contact: "Daniel Okafor", phone: "+1 510 555 0191", stage: "Pre qualified", requested: "$150,000", product: "Line of credit", revenue: "$72,000 per month", timeInBusiness: "4 years", risk: "Low", score: "Pre qualification passed", decisionDue: "Start full application", owners: [{ name: "Daniel Okafor", share: "100%", role: "Director and guarantor", initials: "DO" }], documents: [], offers: [], tasks: [{ id: "invite", title: "Invite client to complete application", due: "Today", type: "SLA", done: false }], audits: [audit("e7", "Today at 8:14 AM", "Website automation", "Lead pre qualified", "Website application")], notes: ["Website application originated from funding calculator."],
  },
];
